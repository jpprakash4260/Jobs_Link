'use strict'
const db = require("../Models")

class IndustryTypeService { }

IndustryTypeService.create = async (obj) => {
   try {
      const saved = await db.IndustryType.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

IndustryTypeService.findAllAndCount = async (indust_id) => {
   try {
      const findAllandCount = await db.IndustryType.findAndCountAll({ where: { indust_id: indust_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

IndustryTypeService.getCollegeDetails = async (indust_id, indust_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__industrytype as a 
                where 
                a.indust_id=${indust_id} and a.indust_status='${indust_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

IndustryTypeService.findByPk = async (indust_id) => {
   try {
      const findByPk = await db.IndustryType.findByPk(indust_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

IndustryTypeService.update = async (indust_id, obj) => {
   try {

      const ext_IndustryType = await db.IndustryType.findOne({ where: obj })

      if (ext_IndustryType && indust_id == ext_IndustryType.indust_id) {

         return 'Exited Values'
      }
      else if (!ext_IndustryType || (ext_IndustryType && indust_id != ext_IndustryType.indust_id)) {

         const updateById = await db.IndustryType.update(obj, { where: { indust_id: indust_id } })
         return updateById[0]

      }
      else return 'IndustryType Not Found'
   }
   catch (err) {
      return err
   }
}

IndustryTypeService.delete = async (indust_id) => {
   try {
      const founded = await db.IndustryType.findByPk(indust_id)
      if (founded) {
         const deleted = await db.IndustryType.destroy({ where: { indust_id: indust_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = IndustryTypeService