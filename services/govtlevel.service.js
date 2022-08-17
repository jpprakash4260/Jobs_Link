'use strict'
const db = require("../Models")

class GovtLevelService { }

GovtLevelService.create = async (obj) => {
   try {
      const saved = await db.GovernmentLevel.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

GovtLevelService.findAllAndCount = async (lev_id) => {
   try {
      const findAllandCount = await db.GovernmentLevel.findAndCountAll({ where: { lev_id: lev_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

GovtLevelService.getCollegeDetails = async (lev_id, lev_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__govtlevel as a 
                where 
                a.lev_id=${lev_id} and a.lev_status='${lev_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

GovtLevelService.findByPk = async (lev_id) => {
   try {
      const findByPk = await db.GovernmentLevel.findByPk(lev_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

GovtLevelService.update = async (lev_id, obj) => {
   try {

      const ext_govtLevel = await db.GovernmentLevel.findOne({ where: obj })

      if (ext_govtLevel && lev_id == ext_govtLevel.lev_id) {

         return 'Exited Values'
      }
      else if (!ext_govtLevel || (ext_govtLevel && lev_id != ext_govtLevel.lev_id)) {

         const updateById = await db.GovernmentLevel.update(obj, { where: { lev_id: lev_id } })
         return updateById[0]

      }
      else return 'GovernmentLevel Not Found'
   }
   catch (err) {
      return err
   }
}

GovtLevelService.delete = async (lev_id) => {
   try {
      const founded = await db.GovernmentLevel.findByPk(lev_id)
      if (founded) {
         const deleted = await db.GovernmentLevel.destroy({ where: { lev_id: lev_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = GovtLevelService