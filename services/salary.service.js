'use strict'
const db = require("../Models")

class SalaryService { }

SalaryService.create = async (obj) => {
   try {
      const saved = await db.Salary.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

SalaryService.findAllAndCount = async (sal_id) => {
   try {
      const findAllandCount = await db.Salary.findAndCountAll({ where: { sal_id: sal_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

SalaryService.getCollegeDetails = async (sal_id, sal_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__salary as a 
                where 
                a.sal_id=${sal_id} and a.sal_status='${sal_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

SalaryService.findByPk = async (sal_id) => {
   try {
      const findByPk = await db.Salary.findByPk(sal_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

SalaryService.update = async (sal_id, obj) => {
   try {

      const ext_salary = await db.Salary.findOne({ where: obj })

      if (ext_salary && sal_id == ext_salary.sal_id) {

         return 'Exited Values'
      }
      else if (!ext_salary || (ext_salary && sal_id != ext_salary.sal_id)) {

         const updateById = await db.Salary.update(obj, { where: { sal_id: sal_id } })
         return updateById[0]

      }
      else return 'Salary Not Found'
   }
   catch (err) {
      return err
   }
}

SalaryService.delete = async (sal_id) => {
   try {
      const founded = await db.Salary.findByPk(sal_id)
      if (founded) {
         const deleted = await db.Salary.destroy({ where: { sal_id: sal_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = SalaryService