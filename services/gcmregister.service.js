'use strict'
const db = require("../Models")

class GcmRegisterService { }

GcmRegisterService.create = async (obj) => {
   try {
      const saved = await db.GcmRegister.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

GcmRegisterService.findAllAndCount = async (id) => {
   try {
      const findAllandCount = await db.GcmRegister.findAndCountAll({ where: { id: id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

GcmRegisterService.getCollegeDetails = async (id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__gcmregister as a 
                where 
                a.id=${id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

GcmRegisterService.findByPk = async (id) => {
   try {
      const findByPk = await db.GcmRegister.findByPk(id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

GcmRegisterService.update = async (id, obj) => {
   try {

      const ext_GcmRegister = await db.GcmRegister.findOne({ where: obj })

      if (ext_GcmRegister && id == ext_GcmRegister.id) {

         return 'Exited Values'
      }
      else if (!ext_GcmRegister || (ext_GcmRegister && id != ext_GcmRegister.id)) {

         const updateById = await db.GcmRegister.update(obj, { where: { id: id } })
         return updateById[0]

      }
      else return 'GcmRegister Not Found'
   }
   catch (err) {
      return err
   }
}

GcmRegisterService.delete = async (id) => {
   try {
      const founded = await db.GcmRegister.findByPk(id)
      if (founded) {
         const deleted = await db.GcmRegister.destroy({ where: { id: id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = GcmRegisterService