'use strict'
const db = require("../Models")

class EmpjobcatService { }

EmpjobcatService.create = async (obj) => {
   try {
      const saved = await db.EmployeeJobCategory.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmpjobcatService.findAllAndCount = async (mjcat_id) => {
   try {
      const findAllandCount = await db.EmployeeJobCategory.findAndCountAll({ where: { mjcat_id: mjcat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmpjobcatService.getCollegeDetails = async (mjcat_id, mjcat_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__empjobcat as a 
                where 
                a.mjcat_id=${mjcat_id} and a.mjcat_status='${mjcat_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmpjobcatService.findByPk = async (mjcat_id) => {
   try {
      const findByPk = await db.EmployeeJobCategory.findByPk(mjcat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmpjobcatService.update = async (mjcat_id, obj) => {
   try {

      const ext_empjobcat = await db.EmployeeJobCategory.findOne({ where: obj })

      if (ext_empjobcat && mjcat_id == ext_empjobcat.mjcat_id) {

         return 'Exited Values'
      }
      else if (!ext_empjobcat || (ext_empjobcat && mjcat_id != ext_empjobcat.mjcat_id)) {

         const updateById = await db.EmployeeJobCategory.update(obj, { where: { mjcat_id: mjcat_id } })
         return updateById[0]

      }
      else return 'EmployeeJobCategory Not Found'
   }
   catch (err) {
      return err
   }
}

EmpjobcatService.delete = async (mjcat_id) => {
   try {
      const founded = await db.EmployeeJobCategory.findByPk(mjcat_id)
      if (founded) {
         const deleted = await db.EmployeeJobCategory.destroy({ where: { mjcat_id: mjcat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EmpjobcatService