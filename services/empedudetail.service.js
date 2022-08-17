'use strict'
const db = require("../Models")

class EmpEducationDetailsService { }

EmpEducationDetailsService.create = async (obj) => {
   try {
      const saved = await db.EmployeeEducationDetails.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmpEducationDetailsService.findAllAndCount = async (edu_id) => {
   try {
      const findAllandCount = await db.EmployeeEducationDetails.findAndCountAll({ where: { edu_id: edu_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmpEducationDetailsService.getCollegeDetails = async (edu_id, colg_name, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__empedudetail as a 
                where 
                a.edu_id=${edu_id} and a.colg_name='${colg_name}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmpEducationDetailsService.findByPk = async (edu_id) => {
   try {
      const findByPk = await db.EmployeeEducationDetails.findByPk(edu_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmpEducationDetailsService.update = async (edu_id, obj) => {
   try {

      const ext_eduDetail = await db.EmployeeEducationDetails.findOne({ where: obj })

      if (ext_eduDetail && edu_id == ext_eduDetail.edu_id) {

         return 'Exited Values'
      }
      else if (!ext_eduDetail || (ext_eduDetail && edu_id != ext_eduDetail.edu_id)) {

         const updateById = await db.EmployeeEducationDetails.update(obj, { where: { edu_id: edu_id } })
         return updateById[0]

      }
      else return 'EmployeeEducationDetails Not Found'
   }
   catch (err) {
      return err
   }
}

EmpEducationDetailsService.delete = async (edu_id) => {
   try {
      const founded = await db.EmployeeEducationDetails.findByPk(edu_id)
      if (founded) {
         const deleted = await db.EmployeeEducationDetails.destroy({ where: { edu_id: edu_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EmpEducationDetailsService