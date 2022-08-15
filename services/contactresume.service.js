'use strict'
const db = require("../Models")

class CollegeService { }

CollegeService.create = async (obj) => {
   try {
      const saved = await db.ContactResume.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CollegeService.findAllAndCount = async (cont_id) => {
   try {
      const findAllandCount = await db.ContactResume.findAndCountAll({ where: { cont_id: cont_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CollegeService.getCollegeDetails = async (cont_id, cont_type, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__contactresume as a 
                where 
                a.cont_id=${cont_id} and a.cont_type='${cont_type}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CollegeService.findByPk = async (cont_id) => {
   try {
      const findByPk = await db.ContactResume.findByPk(cont_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CollegeService.update = async (cont_id, obj) => {
   try {

      const ext_cont = await db.ContactResume.findOne({ where: obj })

      if (ext_cont && cont_id == ext_cont.cont_id) {

         return 'Exited Values'
      }
      else if (!ext_cont || (ext_cont && cont_id != ext_cont.cont_id)) {

         const updateById = await db.ContactResume.update(obj, { where: { cont_id: cont_id } })
         return updateById[0]

      }
      else return 'ContactResume Not Found'
   }
   catch (err) {
      return err
   }
}

CollegeService.delete = async (cont_id) => {
   try {
      const founded = await db.ContactResume.findByPk(cont_id)
      if (founded) {
         const deleted = await db.ContactResume.destroy({ where: { cont_id: cont_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = CollegeService