'use strict'
const db = require("../Models")

class ResumeScoreService { }

ResumeScoreService.create = async (obj) => {
   try {
      const saved = await db.ResumeScore.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

ResumeScoreService.findAllAndCount = async (resume_id) => {
   try {
      const findAllandCount = await db.ResumeScore.findAndCountAll({ where: { resume_id: resume_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

ResumeScoreService.getCollegeDetails = async (resume_id, seo_description, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__resumescore as a 
                where 
                a.resume_id=${resume_id} and a.seo_description='${seo_description}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

ResumeScoreService.findByPk = async (resume_id) => {
   try {
      const findByPk = await db.ResumeScore.findByPk(resume_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

ResumeScoreService.update = async (resume_id, obj) => {
   try {

      const ext_resumescore = await db.ResumeScore.findOne({ where: obj })

      if (ext_resumescore && resume_id == ext_resumescore.resume_id) {

         return 'Exited Values'
      }
      else if (!ext_resumescore || (ext_resumescore && resume_id != ext_resumescore.resume_id)) {

         const updateById = await db.ResumeScore.update(obj, { where: { resume_id: resume_id } })
         return updateById[0]

      }
      else return 'ResumeScore Not Found'
   }
   catch (err) {
      return err
   }
}

ResumeScoreService.delete = async (resume_id) => {
   try {
      const founded = await db.ResumeScore.findByPk(resume_id)
      if (founded) {
         const deleted = await db.ResumeScore.destroy({ where: { resume_id: resume_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = ResumeScoreService