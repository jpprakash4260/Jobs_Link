'use strict'
const db = require("../Models")

class JobPostingService { }

JobPostingService.create = async (obj) => {
   try {
      const saved = await db.JobPosting.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

JobPostingService.findAllAndCount = async (job_id) => {
   try {
      const findAllandCount = await db.JobPosting.findAndCountAll({ where: { job_id: job_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

JobPostingService.getCollegeDetails = async (job_id, job_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__jobposting as a 
                where 
                a.job_id=${job_id} and a.job_status='${job_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

JobPostingService.findByPk = async (job_id) => {
   try {
      const findByPk = await db.JobPosting.findByPk(job_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

JobPostingService.update = async (job_id, obj) => {
   try {

      const ext_JobPosting = await db.JobPosting.findOne({ where: obj })

      if (ext_JobPosting && job_id == ext_JobPosting.job_id) {

         return 'Exited Values'
      }
      else if (!ext_JobPosting || (ext_JobPosting && job_id != ext_JobPosting.job_id)) {

         const updateById = await db.JobPosting.update(obj, { where: { job_id: job_id } })
         return updateById[0]

      }
      else return 'JobPosting Not Found'
   }
   catch (err) {
      return err
   }
}

JobPostingService.delete = async (job_id) => {
   try {
      const founded = await db.JobPosting.findByPk(job_id)
      if (founded) {
         const deleted = await db.JobPosting.destroy({ where: { job_id: job_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = JobPostingService