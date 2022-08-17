'use strict'
const db = require("../Models")

class SeekerService { }

SeekerService.create = async (obj) => {
   try {
      const saved = await db.Employee.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

SeekerService.findAllAndCount = async (emp_id) => {
   try {
      const findAllandCount = await db.Employee.findAndCountAll({ where: { emp_id: emp_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

SeekerService.getCollegeDetails = async (emp_id, emp_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__employee as a 
                where 
                a.emp_id=${emp_id} and a.emp_status='${emp_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

SeekerService.findByPk = async (emp_id) => {
   try {
      const findByPk = await db.Employee.findByPk(emp_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

SeekerService.update = async (emp_id, obj) => {
   try {

      const ext_seeker = await db.Employee.findOne({ where: obj })

      if (ext_seeker && emp_id == ext_seeker.emp_id) {

         return 'Exited Values'
      }
      else if (!ext_seeker || (ext_seeker && emp_id != ext_seeker.emp_id)) {

         const updateById = await db.Employee.update(obj, { where: { emp_id: emp_id } })
         return updateById[0]

      }
      else return 'Employee Not Found'
   }
   catch (err) {
      return err
   }
}

SeekerService.delete = async (emp_id) => {
   try {
      const founded = await db.Employee.findByPk(emp_id)
      if (founded) {
         const deleted = await db.Employee.destroy({ where: { emp_id: emp_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = SeekerService