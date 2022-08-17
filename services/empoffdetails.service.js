'use strict'
const db = require("../Models")

class EmpOfficialService { }

EmpOfficialService.create = async (obj) => {
   try {
      const saved = await db.EmployeeOfficialDetails.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmpOfficialService.findAllAndCount = async (wrk_id) => {
   try {
      const findAllandCount = await db.EmployeeOfficialDetails.findAndCountAll({ where: { wrk_id: wrk_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmpOfficialService.getCollegeDetails = async (wrk_id, wrk_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__empoffdetails as a 
                where 
                a.wrk_id=${wrk_id} and a.wrk_status='${wrk_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmpOfficialService.findByPk = async (wrk_id) => {
   try {
      const findByPk = await db.EmployeeOfficialDetails.findByPk(wrk_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmpOfficialService.update = async (wrk_id, obj) => {
   try {

      const ext_empoffdetails = await db.EmployeeOfficialDetails.findOne({ where: obj })

      if (ext_empoffdetails && wrk_id == ext_empoffdetails.wrk_id) {

         return 'Exited Values'
      }
      else if (!ext_empoffdetails || (ext_empoffdetails && wrk_id != ext_empoffdetails.wrk_id)) {

         const updateById = await db.EmployeeOfficialDetails.update(obj, { where: { wrk_id: wrk_id } })
         return updateById[0]

      }
      else return 'EmployeeOfficialDetails Not Found'
   }
   catch (err) {
      return err
   }
}

EmpOfficialService.delete = async (wrk_id) => {
   try {
      const founded = await db.EmployeeOfficialDetails.findByPk(wrk_id)
      if (founded) {
         const deleted = await db.EmployeeOfficialDetails.destroy({ where: { wrk_id: wrk_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EmpOfficialService