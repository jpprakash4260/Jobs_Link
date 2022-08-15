'use strict'
const db = require("../Models")

class CollegeService { }

CollegeService.create = async (obj) => {
   try {
      const saved = await db.Specialization.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CollegeService.findAllAndCount = async (speclz_id) => {
   try {
      const findAllandCount = await db.Specialization.findAndCountAll({ where: { speclz_id: speclz_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CollegeService.getCollegeDetails = async (speclz_id, speclz_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__specialization as a 
                where 
                a.speclz_id=${speclz_id} and a.speclz_status='${speclz_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CollegeService.findByPk = async (speclz_id) => {
   try {
      const findByPk = await db.Specialization.findByPk(speclz_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CollegeService.update = async (speclz_id, obj) => {
   try {

      const ext_Specialization = await db.Specialization.findOne({ where: obj })

      if (ext_Specialization && speclz_id == ext_Specialization.speclz_id) {

         return 'Exited Values'
      }
      else if (!ext_Specialization || (ext_Specialization && speclz_id != ext_Specialization.speclz_id)) {

         const updateById = await db.Specialization.update(obj, { where: { speclz_id: speclz_id } })
         return updateById[0]

      }
      else return 'Specialization Not Found'
   }
   catch (err) {
      return err
   }
}

CollegeService.delete = async (speclz_id) => {
   try {
      const founded = await db.Specialization.findByPk(speclz_id)
      if (founded) {
         const deleted = await db.Specialization.destroy({ where: { speclz_id: speclz_id } })
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