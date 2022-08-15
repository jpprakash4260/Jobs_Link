'use strict'
const db = require("../Models")

class JobAppliedService { }

JobAppliedService.create = async (obj) => {
   try {
      const saved = await db.JobApplied.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

JobAppliedService.findAllAndCount = async (applied_id) => {
   try {
      const findAllandCount = await db.JobApplied.findAndCountAll({ where: { applied_id: applied_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

JobAppliedService.getCollegeDetails = async (applied_id, appl_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__jobapplied as a 
                where 
                a.applied_id=${applied_id} and a.appl_status='${appl_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

JobAppliedService.findByPk = async (applied_id) => {
   try {
      const findByPk = await db.JobApplied.findByPk(applied_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

JobAppliedService.update = async (applied_id, obj) => {
   try {

      const ext_jobapplied = await db.JobApplied.findOne({ where: obj })

      if (ext_jobapplied && applied_id == ext_jobapplied.applied_id) {

         return 'Exited Values'
      }
      else if (!ext_jobapplied || (ext_jobapplied && applied_id != ext_jobapplied.applied_id)) {

         const updateById = await db.JobApplied.update(obj, { where: { applied_id: applied_id } })
         return updateById[0]

      }
      else return 'JobApplied Not Found'
   }
   catch (err) {
      return err
   }
}

JobAppliedService.delete = async (applied_id) => {
   try {
      const founded = await db.JobApplied.findByPk(applied_id)
      if (founded) {
         const deleted = await db.JobApplied.destroy({ where: { applied_id: applied_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = JobAppliedService