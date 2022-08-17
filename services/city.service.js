'use strict'
const db = require("../Models")

class CityService { }

CityService.create = async (obj) => {
   try {
      const saved = await db.City.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CityService.findAllAndCount = async (city_id) => {
   try {
      const findAllandCount = await db.City.findAndCountAll({ where: { city_id: city_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CityService.getCityDetails = async (city_id, city_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__city as a 
                where 
                a.city_id=${city_id} and a.city_status='${city_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CityService.findByPk = async (city_id) => {
   try {
      const findByPk = await db.City.findByPk(city_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CityService.update = async (city_id, obj) => {
   try {

      const ext_city = await db.city_id.findOne({ where: obj })

      if (ext_city && city_id == ext_city.city_id) {

         return 'Exited Values'
      }
      else if (!ext_city || (ext_city && city_id != ext_city.city_id)) {

         const updateById = await db.city_id.update(obj, { where: { city_id: city_id } })
         return updateById[0]

      }
      else return 'City Not Found'
   }
   catch (err) {
      return err
   }
}

CityService.delete = async (city_id) => {
   try {
      const founded = await db.City.findByPk(city_id)
      if (founded) {
         const deleted = await db.City.destroy({ where: { city_id: city_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = CityService