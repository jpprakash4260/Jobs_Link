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

ConferenceService.findAllAndCount = async (conf_id) => {
   try {
      const findAllandCount = await db.Conference.findAndCountAll({ where: { conf_id: conf_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

ConferenceService.getCollegeDetails = async (conf_title, conf_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__conference as a 
                where 
                a.conf_title='${conf_title}' and a.conf_status='${conf_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

ConferenceService.findByPk = async (conf_id) => {
   try {
      const findByPk = await db.Conference.findByPk(conf_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

ConferenceService.update = async (conf_id, obj) => {
   try {

      const ext_conf = await db.Conference.findOne({ where: obj })

      if (ext_conf && conf_id == ext_conf.conf_id) {

         return 'Exited Values'
      }
      else if (!ext_conf || (ext_conf && conf_id != ext_conf.conf_id)) {

         const updateById = await db.Conference.update(obj, { where: { conf_id: conf_id } })
         return updateById[0]

      }
      else return 'Conference Not Found'
   }

   catch (err) {
      return err
   }
}

ConferenceService.delete = async (conf_id) => {
   try {
      const founded = await db.Conference.findByPk(conf_id)
      if (founded) {
         const deleted = await db.Conference.destroy({ where: { conf_id: conf_id } })
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