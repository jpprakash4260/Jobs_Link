'use strict'
const db = require("../Models")
const moment = require('moment')
const createError = require('http-errors')


class AdminService { }

AdminService.create = async (obj) => {
   try {
      const saved = await db.Admin.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

AdminService.findAllAndCount = async (admin_id) => {
   try {
      const findAllandCount = await db.Admin.findAndCountAll({ where: { admin_id: admin_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

AdminService.getAdminDetails = async (admin_id, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__admin as a 
                where 
                a.admin_id=${admin_id} and a.admin_status='Y'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

AdminService.findByPk = async (admin_id) => {
   try {
      const findByPk = await db.Admin.findByPk(admin_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

AdminService.update = async (_id, obj) => {
   try {
      const founded = await db.Admin.findByPk(_id)
      if (founded) {

         let checked = 'same'

         for (let i = 0; i < (Object.keys(obj).length); i++) {

            var exited_ = (founded[Object.keys(obj)[i]])
            var new_ = Object.values(obj)[i]

            if (new_ == exited_) {
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
            const updateById = await db.Admin.update(obj, { where: { admin_id: _id } })
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

AdminService.delete = async (admin_id) => {
   try {
      const founded = await db.Admin.findByPk(admin_id)
      if (founded) {
         const deleted = await db.Admin.destroy({ where: { admin_id: admin_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = AdminService