'use strict'
const db = require("../Models")

class AccessService { }

AccessService.create = async (obj) => {
   try {
      const saved = await db.Access.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

AccessService.findAllAndCount = async (access_id) => {
   try {
      const findAllandCount = await db.Access.findAndCountAll({ where: { access_id: access_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

AccessService.getAccessDetails = async (access_id, _start, _limit) => {
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
   }
   catch (error) {
      return error
   }
}

AccessService.findByPk = async (access_id) => {
   try {

      const findByPk = await db.Access.findByPk(access_id)
      return findByPk

   }
   catch (err) {
      return err
   }
}

AccessService.update = async (access_id, obj) => {
   try {

      const ext_acsess = await db.Access.findOne({ where: obj })

      if (ext_acsess && access_id == ext_acsess.access_id) {

         return 'Exited Values'
      }
      else if (!ext_acsess || (ext_acsess && access_id != ext_acsess.access_id)) {

         const updateById = await db.Access.update(obj, { where: { access_id: access_id } })
         return updateById[0]

      }
      else return 'Access Not Found'
   }
   catch (err) {
      return err
   }
}

AccessService.delete = async (access_id) => {
   try {

      const founded = await db.Access.findByPk(access_id)

      if (founded) {
         const deleted = await db.Access.destroy({ where: { access_id: access_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   }
   catch (err) {
      return err
   }
}


module.exports = AccessService