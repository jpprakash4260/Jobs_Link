'use strict'
const db = require("../Models")

class ConferenceService { }

ConferenceService.create = async (obj) => {
   try {
      const saved = await db.Conference.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

ConferenceService.findAllAndCount = async (colg_id) => {
   try {
      const findAllandCount = await db.Conference.findAndCountAll({ where: { colg_id: colg_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

ConferenceService.getCollegeDetails = async (colg_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.colg_id=${colg_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

ConferenceService.findByPk = async (colg_id) => {
   try {
      const findByPk = await db.Conference.findByPk(colg_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

ConferenceService.update = async (colg_id, obj) => {
   try {

      const ext_access = await db.Conference.findOne({ where: obj })
      const founded = await db.Conference.findByPk(colg_id)

      if (founded && ext_access) {
         return 'Exited Values'
      }
      else if (!ext_access && founded) {
         const updateById = await db.Conference.update(obj, { where: { colg_id: colg_id } })
         return updateById[0]
      }
      else return 'Conference Not Found'
   }
   catch (err) {
      return err
   }
}

ConferenceService.delete = async (colg_id) => {
   try {
      const founded = await db.Conference.findByPk(colg_id)
      if (founded) {
         const deleted = await db.Conference.destroy({ where: { colg_id: colg_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = ConferenceService