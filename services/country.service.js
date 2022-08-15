'use strict'
const db = require("../Models")

class CollegeService { }

CollegeService.create = async (obj) => {
   try {
      const saved = await db.Country.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CollegeService.findAllAndCount = async (country_id) => {
   try {
      const findAllandCount = await db.Country.findAndCountAll({ where: { country_id: country_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CollegeService.getCollegeDetails = async (country_id, country_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__country as a 
                where 
                a.country_id=${country_id} and a.country_status='${country_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CollegeService.findByPk = async (country_id) => {
   try {
      const findByPk = await db.Country.findByPk(country_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CollegeService.update = async (country_id, obj) => {
   try {

      const ext_conf = await db.Conference.findOne({ where: obj })

      if (ext_conf && country_id == ext_conf.country_id) {

         return 'Exited Values'
      }
      else if (!ext_conf || (ext_conf && country_id != ext_conf.country_id)) {

         const updateById = await db.Conference.update(obj, { where: { country_id: country_id } })
         return updateById[0]

      }
      else return 'Country Not Found'
   }
   catch (err) {
      return err
   }
}

CollegeService.delete = async (country_id) => {
   try {
      const founded = await db.Country.findByPk(country_id)
      if (founded) {
         const deleted = await db.Country.destroy({ where: { country_id: country_id } })
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