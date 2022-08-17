'use strict'
const db = require("../Models")

class JobHistoryService { }

JobHistoryService.create = async (obj) => {
   try {
      const saved = await db.JobHistory.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

JobHistoryService.findAllAndCount = async (id) => {
   try {
      const findAllandCount = await db.JobHistory.findAndCountAll({ where: { id: id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

JobHistoryService.getCollegeDetails = async (id, job_type, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__jobhistory as a 
                where 
                a.id=${id} and a.job_type='${job_type}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

JobHistoryService.findByPk = async (id) => {
   try {
      const findByPk = await db.JobHistory.findByPk(id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

JobHistoryService.update = async (id, obj) => {
   try {

      const ext_jobHistory = await db.JobHistory.findOne({ where: obj })

      if (ext_jobHistory && id == ext_jobHistory.id) {

         return 'Exited Values'
      }
      else if (!ext_jobHistory || (ext_jobHistory && id != ext_jobHistory.id)) {

         const updateById = await db.JobHistory.update(obj, { where: { id: id } })
         return updateById[0]

      }
      else return 'JobHistory Not Found'
   }
   catch (err) {
      return err
   }
}

JobHistoryService.delete = async (id) => {
   try {
      const founded = await db.JobHistory.findByPk(id)
      if (founded) {
         const deleted = await db.JobHistory.destroy({ where: { id: id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = JobHistoryService