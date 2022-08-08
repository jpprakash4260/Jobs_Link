'use strict'
const db = require("../Models")
const sequelize = require('../Models')
const moment = require('moment')

class AccessKeyService { }

AccessKeyService.create = async (obj) => {
   try {
      const saved = await db.AccessKey.create(obj)
      return saved
   } catch (error) {
      return error
   }
}

AccessKeyService.findAllAndCount = async (access_id) => {
   try {
      const findAllandCount = await db.AccessKey.findAndCountAll({ where: { access_id: access_id } })
      return findAllandCount
   } catch (err) {
      return err
   }
}

AccessKeyService.getAccessDetails = async (access_id, _start, _limit) => {
   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__accessKey as a 
                where 
                a.access_id=${access_id} and a.access_status='Y'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

AccessKeyService.findByPk = async (access_id) => {
   try {
      const findByPk = await db.AccessKey.findByPk(access_id)
      return findByPk
   } catch (err) {
      return err
   }
}

AccessKeyService.update = async (_id, obj) => {
   try {
      const founded = await db.AccessKey.findByPk(_id)
      if (founded) {

         let checked = 'same'

         for (let i = 0; i < ((Object.keys(obj).length) - 1); i++) {

            var exited_ = (founded[Object.keys(obj)[i]])
            var new_ = Object.values(obj)[i]

            if (new_ == exited_) {
               continue
            } else
               checked = 'not same'
            console.error(Object.keys(obj)[i], " : ", exited_, ' == ', new_)
            break
         }
         if (checked == 'not same') {

            obj.lastupdate = moment()
            const updateById = await db.AccessKey.update(obj, { where: { access_id: _id } })
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

AccessKeyService.delete = async (access_id) => {
   try {
      const founded = await db.AccessKey.findByPk(access_id)
      if (founded) {
         const deleted = await db.AccessKey.destroy({ where: { access_id: access_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = AccessKeyService