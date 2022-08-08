'use strict'
const db = require("../Models")
const moment = require('moment')


class CampusService { }

CampusService.create = async (obj) => {
   try {
      const saved = await db.Campus.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CampusService.findAllAndCount = async (camp_id) => {
   try {
      const findAllandCount = await db.Campus.findAndCountAll({ where: { camp_id: camp_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CampusService.getCampusDetails = async (camp_id, camp_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__campus as a 
                where 
                a.camp_org='${camp_id}' and a.camp_status='${camp_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CampusService.findByPk = async (camp_id) => {
   try {
      const findByPk = await db.Campus.findByPk(camp_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CampusService.update = async (_id, obj) => {
   try {
      const founded = await db.Campus.findByPk(_id)
      if (founded) {

         let checked = 'same'

         for (let i = 0; i < Object.keys(obj).length; i++) {

            var exited_ = (founded[Object.keys(obj)[i]])
            var new_ = Object.values(obj)[i]

            if (new_ == exited_) {
               // console.error('same ==> ', Object.keys(obj)[i], " : ", exited_, ' == ', new_)
               continue
            } else {
               if (Object.keys(obj)[i] == 'lastupdate') {
                  continue
               }
               else {
                  checked = 'not same'
                  console.error('notsame : ', Object.keys(obj)[i], " : ", exited_, ' = ', new_)
                  break
               }
            }
         }
         if (checked == 'not same') {

            obj.lastupdate = moment().format()
            const updateById = await db.Campus.update(obj, { where: { camp_id: _id } })
            return updateById[0]

         }
         return 'Exited Values'
      }
      return 'Access Not Found'
   }
   catch (err) {
      return err
   }
}

CampusService.delete = async (camp_id) => {
   try {
      const founded = await db.Campus.findByPk(camp_id)
      if (founded) {
         const deleted = await db.Campus.destroy({ where: { camp_id: camp_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = CampusService