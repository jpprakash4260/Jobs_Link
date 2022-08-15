'use strict'
const db = require("../Models")

class GovCategoryService { }

GovCategoryService.create = async (obj) => {
   try {
      const saved = await db.College.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

GovCategoryService.findAllAndCount = async (gcat_id) => {
   try {
      const findAllandCount = await db.College.findAndCountAll({ where: { gcat_id: gcat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

GovCategoryService.getCollegeDetails = async (gcat_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__govcategory as a 
                where 
                a.gcat_id=${gcat_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

GovCategoryService.findByPk = async (gcat_id) => {
   try {
      const findByPk = await db.College.findByPk(gcat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

GovCategoryService.update = async (gcat_id, obj) => {
   try {

      const ext_govcategory = await db.Conference.findOne({ where: obj })

      if (ext_govcategory && gcat_id == ext_govcategory.gcat_id) {

         return 'Exited Values'
      }
      else if (!ext_govcategory || (ext_govcategory && gcat_id != ext_govcategory.gcat_id)) {

         const updateById = await db.Conference.update(obj, { where: { gcat_id: gcat_id } })
         return updateById[0]

      }
      else return 'Conference Not Found'
   }
   catch (err) {
      return err
   }
}

GovCategoryService.delete = async (gcat_id) => {
   try {
      const founded = await db.College.findByPk(gcat_id)
      if (founded) {
         const deleted = await db.College.destroy({ where: { gcat_id: gcat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = GovCategoryService