'use strict'
const db = require("../Models")

class QualificationService { }

QualificationService.create = async (obj) => {
   try {
      const saved = await db.Qualification.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

QualificationService.findAllAndCount = async (qual_id) => {
   try {
      const findAllandCount = await db.Qualification.findAndCountAll({ where: { qual_id: qual_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

QualificationService.getCollegeDetails = async (qual_id, qual_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__qualification as a 
                where 
                a.qual_id=${qual_id} and a.qual_status='${qual_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

QualificationService.findByPk = async (qual_id) => {
   try {
      const findByPk = await db.Qualification.findByPk(qual_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

QualificationService.update = async (qual_id, obj) => {
   try {

      const ext_qualification = await db.Qualification.findOne({ where: obj })

      if (ext_qualification && qual_id == ext_qualification.qual_id) {

         return 'Exited Values'
      }
      else if (!ext_qualification || (ext_qualification && qual_id != ext_qualification.qual_id)) {

         const updateById = await db.Qualification.update(obj, { where: { qual_id: qual_id } })
         return updateById[0]

      }
      else return 'Qualification Not Found'
   }
   catch (err) {
      return err
   }
}

QualificationService.delete = async (qual_id) => {
   try {
      const founded = await db.Qualification.findByPk(qual_id)
      if (founded) {
         const deleted = await db.Qualification.destroy({ where: { qual_id: qual_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = QualificationService