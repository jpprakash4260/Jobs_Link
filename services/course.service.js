'use strict'
const db = require("../Models")

class CourseService { }

CourseService.create = async (obj) => {
   try {
      const saved = await db.Course.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CourseService.findAllAndCount = async (course_id) => {
   try {
      const findAllandCount = await db.Course.findAndCountAll({ where: { course_id: course_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CourseService.getCollegeDetails = async (course_id, course_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__course as a 
                where 
                a.course_id=${course_id} and a.course_status='${course_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CourseService.findByPk = async (course_id) => {
   try {
      const findByPk = await db.Course.findByPk(course_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CourseService.update = async (course_id, obj) => {
   try {

      const ext_course = await db.Course.findOne({ where: obj })

      if (ext_course && course_id == ext_course.course_id) {

         return 'Exited Values'
      }
      else if (!ext_course || (ext_course && course_id != ext_course.course_id)) {

         const updateById = await db.Course.update(obj, { where: { course_id: course_id } })
         return updateById[0]

      }
      else return 'Course Not Found'
   }
   catch (err) {
      return err
   }
}

CourseService.delete = async (course_id) => {
   try {
      const founded = await db.Course.findByPk(course_id)
      if (founded) {
         const deleted = await db.Course.destroy({ where: { course_id: course_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = CourseService