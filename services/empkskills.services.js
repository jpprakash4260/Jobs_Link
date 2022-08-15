'use strict'
const db = require("../Models")

class EmpkskillsService { }

EmpkskillsService.create = async (obj) => {
   try {
      const saved = await db.EmployeeKeyskills.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmpkskillsService.findAllAndCount = async (empkskil_id) => {
   try {
      const findAllandCount = await db.EmployeeKeyskills.findAndCountAll({ where: { empkskil_id: empkskil_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmpkskillsService.getCollegeDetails = async (empkskil_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.empkskil_id=${empkskil_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmpkskillsService.findByPk = async (empkskil_id) => {
   try {
      const findByPk = await db.EmployeeKeyskills.findByPk(empkskil_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmpkskillsService.update = async (empkskil_id, obj) => {
   try {

      const ext_empkskills = await db.EmployeeKeyskills.findOne({ where: obj })

      if (ext_empkskills && empkskil_id == ext_empkskills.empkskil_id) {

         return 'Exited Values'
      }
      else if (!ext_empkskills || (ext_empkskills && empkskil_id != ext_empkskills.empkskil_id)) {

         const updateById = await db.EmployeeKeyskills.update(obj, { where: { empkskil_id: empkskil_id } })
         return updateById[0]

      }
      else return 'EmployeeKeyskills Not Found'
   }
   catch (err) {
      return err
   }
}

EmpkskillsService.delete = async (empkskil_id) => {
   try {
      const founded = await db.EmployeeKeyskills.findByPk(empkskil_id)
      if (founded) {
         const deleted = await db.EmployeeKeyskills.destroy({ where: { empkskil_id: empkskil_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EmpkskillsService