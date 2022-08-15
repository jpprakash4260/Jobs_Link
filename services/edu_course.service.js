'use strict'
const db = require("../Models")

class Edu_CourseService { }

Edu_CourseService.create = async (obj) => {
   try {
      const saved = await db.EducationCourse.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

Edu_CourseService.findAllAndCount = async (ecat_id) => {
   try {
      const findAllandCount = await db.EducationCourse.findAndCountAll({ where: { ecat_id: ecat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

Edu_CourseService.getCollegeDetails = async (ecat_id, ecat_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__edu_course as a 
                where 
                a.ecat_id=${ecat_id} and a.ecat_status='${ecat_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

Edu_CourseService.findByPk = async (ecat_id) => {
   try {
      const findByPk = await db.EducationCourse.findByPk(ecat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

Edu_CourseService.update = async (ecat_id, obj) => {
   try {

      const ext_edu_course = await db.EducationCourse.findOne({ where: obj })

      if (ext_edu_course && ecat_id == ext_edu_course.ecat_id) {

         return 'Exited Values'
      }
      else if (!ext_edu_course || (ext_edu_course && ecat_id != ext_edu_course.ecat_id)) {

         const updateById = await db.EducationCourse.update(obj, { where: { ecat_id: ecat_id } })
         return updateById[0]

      }
      else return 'EducationCourse Not Found'
   }
   catch (err) {
      return err
   }
}

Edu_CourseService.delete = async (ecat_id) => {
   try {
      const founded = await db.EducationCourse.findByPk(ecat_id)
      if (founded) {
         const deleted = await db.EducationCourse.destroy({ where: { ecat_id: ecat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = Edu_CourseService