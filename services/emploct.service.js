'use strict'
const db = require("../Models")

class EmplocatService { }

EmplocatService.create = async (obj) => {
   try {
      const saved = await db.EmployeeLocation.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmplocatService.findAllAndCount = async (emplocat_id) => {
   try {
      const findAllandCount = await db.EmployeeLocation.findAndCountAll({ where: { emplocat_id: emplocat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmplocatService.getCollegeDetails = async (emplocat_id, locat_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.emplocat_id=${emplocat_id} and a.locat_status='${locat_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmplocatService.findByPk = async (emplocat_id) => {
   try {
      const findByPk = await db.EmployeeLocation.findByPk(emplocat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmplocatService.update = async (emplocat_id, obj) => {
   try {

      const ext_Emplocat = await db.EmployeeLocation.findOne({ where: obj })

      if (ext_Emplocat && emplocat_id == ext_Emplocat.emplocat_id) {

         return 'Exited Values'
      }
      else if (!ext_Emplocat || (ext_Emplocat && emplocat_id != ext_Emplocat.emplocat_id)) {

         const updateById = await db.EmployeeLocation.update(obj, { where: { emplocat_id: emplocat_id } })
         return updateById[0]

      }
      else return 'EmployeeLocation Not Found'
   }
   catch (err) {
      return err
   }
}

EmplocatService.delete = async (emplocat_id) => {
   try {
      const founded = await db.EmployeeLocation.findByPk(emplocat_id)
      if (founded) {
         const deleted = await db.EmployeeLocation.destroy({ where: { emplocat_id: emplocat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EmplocatService