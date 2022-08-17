'use strict'
const db = require("../Models")

class JobsCategoryService { }

JobsCategoryService.create = async (obj) => {
   try {
      const saved = await db.JobsCategory.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

JobsCategoryService.findAllAndCount = async (jcat_id) => {
   try {
      const findAllandCount = await db.JobsCategory.findAndCountAll({ where: { jcat_id: jcat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

JobsCategoryService.getCollegeDetails = async (jcat_id, jcat_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__jobscategory as a 
                where 
                a.jcat_id=${jcat_id} and a.jcat_status='${jcat_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

JobsCategoryService.findByPk = async (jcat_id) => {
   try {
      const findByPk = await db.JobsCategory.findByPk(jcat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

JobsCategoryService.update = async (jcat_id, obj) => {
   try {

      const ext_JobsCategory = await db.JobsCategory.findOne({ where: obj })

      if (ext_JobsCategory && jcat_id == ext_JobsCategory.jcat_id) {

         return 'Exited Values'
      }
      else if (!ext_JobsCategory || (ext_JobsCategory && jcat_id != ext_JobsCategory.jcat_id)) {

         const updateById = await db.JobsCategory.update(obj, { where: { jcat_id: jcat_id } })
         return updateById[0]

      }
      else return 'JobsCategory Not Found'
   }
   catch (err) {
      return err
   }
}

JobsCategoryService.delete = async (jcat_id) => {
   try {
      const founded = await db.JobsCategory.findByPk(jcat_id)
      if (founded) {
         const deleted = await db.JobsCategory.destroy({ where: { jcat_id: jcat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = JobsCategoryService