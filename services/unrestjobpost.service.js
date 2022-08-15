'use strict'
const db = require("../Models")

class UnrestJobPostService { }

UnrestJobPostService.create = async (obj) => {
   try {
      const saved = await db.UnrestJobPost.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

UnrestJobPostService.findAllAndCount = async (unrst_jid) => {
   try {
      const findAllandCount = await db.UnrestJobPost.findAndCountAll({ where: { unrst_jid: unrst_jid } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

UnrestJobPostService.getCollegeDetails = async (unrst_jid, posted_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__unrestjobpost as a 
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

UnrestJobPostService.findByPk = async (unrst_jid) => {
   try {
      const findByPk = await db.UnrestJobPost.findByPk(unrst_jid)
      return findByPk
   }
   catch (err) {
      return err
   }
}

UnrestJobPostService.update = async (unrst_jid, obj) => {
   try {

      const ext_UnrestJobPost = await db.UnrestJobPost.findOne({ where: obj })

      if (ext_UnrestJobPost && unrst_jid == ext_UnrestJobPost.unrst_jid) {

         return 'Exited Values'
      }
      else if (!ext_UnrestJobPost || (ext_UnrestJobPost && unrst_jid != ext_UnrestJobPost.unrst_jid)) {

         const updateById = await db.UnrestJobPost.update(obj, { where: { unrst_jid: unrst_jid } })
         return updateById[0]

      }
      else return 'UnrestJobPost Not Found'
   }
   catch (err) {
      return err
   }
}

UnrestJobPostService.delete = async (unrst_jid) => {
   try {
      const founded = await db.UnrestJobPost.findByPk(unrst_jid)
      if (founded) {
         const deleted = await db.UnrestJobPost.destroy({ where: { unrst_jid: unrst_jid } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = UnrestJobPostService