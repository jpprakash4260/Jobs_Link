'use strict'
const db = require("../Models")

class UnrestJobPostExpService { }

UnrestJobPostExpService.create = async (obj) => {
   try {
      const saved = await db.UnrestJobPostExp.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

UnrestJobPostExpService.findAllAndCount = async (unrst_jid) => {
   try {
      const findAllandCount = await db.UnrestJobPostExp.findAndCountAll({ where: { unrst_jid: unrst_jid } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

UnrestJobPostExpService.getCollegeDetails = async (unrst_jid, posted_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__unrestjobpost_exp as a 
                where 
                a.unrst_jid=${unrst_jid} and a.posted_status='${posted_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

UnrestJobPostExpService.findByPk = async (unrst_jid) => {
   try {
      const findByPk = await db.UnrestJobPostExp.findByPk(unrst_jid)
      return findByPk
   }
   catch (err) {
      return err
   }
}

UnrestJobPostExpService.update = async (unrst_jid, obj) => {
   try {

      const ext_unrstjobpost_exp = await db.UnrestJobPostExp.findOne({ where: obj })

      if (ext_unrstjobpost_exp && unrst_jid == ext_unrstjobpost_exp.unrst_jid) {

         return 'Exited Values'
      }
      else if (!ext_unrstjobpost_exp || (ext_unrstjobpost_exp && unrst_jid != ext_unrstjobpost_exp.unrst_jid)) {

         const updateById = await db.UnrestJobPostExp.update(obj, { where: { unrst_jid: unrst_jid } })
         return updateById[0]

      }
      else return 'UnrestJobPostExp Not Found'
   }
   catch (err) {
      return err
   }
}

UnrestJobPostExpService.delete = async (unrst_jid) => {
   try {
      const founded = await db.UnrestJobPostExp.findByPk(unrst_jid)
      if (founded) {
         const deleted = await db.UnrestJobPostExp.destroy({ where: { unrst_jid: unrst_jid } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = UnrestJobPostExpService