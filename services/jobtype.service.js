'use strict'
const db = require("../Models")

class JobTypeService { }

JobTypeService.create = async (obj) => {
   try {
      const saved = await db.JobType.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

JobTypeService.findAllAndCount = async (jtype_id) => {
   try {
      const findAllandCount = await db.JobType.findAndCountAll({ where: { jtype_id: jtype_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

JobTypeService.getCollegeDetails = async (jtype_id, jtype_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__jobtype as a 
                where 
                a.jtype_id=${jtype_id} and a.jtype_status='${jtype_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

JobTypeService.findByPk = async (jtype_id) => {
   try {
      const findByPk = await db.JobType.findByPk(jtype_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

JobTypeService.update = async (jtype_id, obj) => {
   try {

      const ext_Jobtype = await db.JobType.findOne({ where: obj })

      if (ext_Jobtype && jtype_id == ext_Jobtype.jtype_id) {

         return 'Exited Values'
      }
      else if (!ext_Jobtype || (ext_Jobtype && jtype_id != ext_Jobtype.jtype_id)) {

         const updateById = await db.JobType.update(obj, { where: { jtype_id: jtype_id } })
         return updateById[0]

      }
      else return 'JobType Not Found'
   }
   catch (err) {
      return err
   }
}

JobTypeService.delete = async (jtype_id) => {
   try {
      const founded = await db.JobType.findByPk(jtype_id)
      if (founded) {
         const deleted = await db.JobType.destroy({ where: { jtype_id: jtype_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = JobTypeService