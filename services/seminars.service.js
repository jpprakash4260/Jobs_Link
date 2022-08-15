'use strict'
const db = require("../Models")

class SeminarsService { }

SeminarsService.create = async (obj) => {
   try {
      const saved = await db.Seminars.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

SeminarsService.findAllAndCount = async (semi_id) => {
   try {
      const findAllandCount = await db.Seminars.findAndCountAll({ where: { semi_id: semi_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

SeminarsService.getCollegeDetails = async (semi_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__seminars as a 
                where 
                a.semi_id=${semi_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

SeminarsService.findByPk = async (semi_id) => {
   try {
      const findByPk = await db.Seminars.findByPk(semi_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

SeminarsService.update = async (semi_id, obj) => {
   try {

      const ext_seminars = await db.Seminars.findOne({ where: obj })

      if (ext_seminars && semi_id == ext_seminars.semi_id) {

         return 'Exited Values'
      }
      else if (!ext_seminars || (ext_seminars && semi_id != ext_seminars.semi_id)) {

         const updateById = await db.Seminars.update(obj, { where: { semi_id: semi_id } })
         return updateById[0]

      }
      else return 'Seminars Not Found'
   }
   catch (err) {
      return err
   }
}

SeminarsService.delete = async (semi_id) => {
   try {
      const founded = await db.Seminars.findByPk(semi_id)
      if (founded) {
         const deleted = await db.Seminars.destroy({ where: { semi_id: semi_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = SeminarsService