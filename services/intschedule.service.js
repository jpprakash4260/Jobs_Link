'use strict'
const db = require("../Models")

class IntScheduleService { }

IntScheduleService.create = async (obj) => {
   try {
      const saved = await db.InterviewSchedule.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

IntScheduleService.findAllAndCount = async (intsch_id) => {
   try {
      const findAllandCount = await db.InterviewSchedule.findAndCountAll({ where: { intsch_id: intsch_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

IntScheduleService.getCollegeDetails = async (intsch_id, emp_id, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.intsch_id=${intsch_id} and a.emp_id='${emp_id}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

IntScheduleService.findByPk = async (intsch_id) => {
   try {
      const findByPk = await db.InterviewSchedule.findByPk(intsch_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

IntScheduleService.update = async (intsch_id, obj) => {
   try {

      const ext_intsch = await db.InterviewSchedule.findOne({ where: obj })

      if (ext_intsch && intsch_id == ext_intsch.intsch_id) {

         return 'Exited Values'
      }
      else if (!ext_intsch || (ext_intsch && intsch_id != ext_intsch.intsch_id)) {

         const updateById = await db.InterviewSchedule.update(obj, { where: { intsch_id: intsch_id } })
         return updateById[0]

      }
      else return 'InterviewSchedule Not Found'
   }
   catch (err) {
      return err
   }
}

IntScheduleService.delete = async (intsch_id) => {
   try {
      const founded = await db.InterviewSchedule.findByPk(intsch_id)
      if (founded) {
         const deleted = await db.InterviewSchedule.destroy({ where: { intsch_id: intsch_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = IntScheduleService