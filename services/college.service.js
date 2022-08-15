'use strict'
const db = require("../Models")

class CollegeService { }

CollegeService.create = async (obj) => {
   try {
      const saved = await db.College.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CollegeService.findAllAndCount = async (colg_id) => {
   try {
      const findAllandCount = await db.College.findAndCountAll({ where: { colg_id: colg_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CollegeService.getCollegeDetails = async (colg_id, colg_status, _start, _limit) => {

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

CollegeService.findByPk = async (colg_id) => {
   try {
      const findByPk = await db.College.findByPk(colg_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CollegeService.update = async (colg_id, obj) => {
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

CollegeService.delete = async (colg_id) => {
   try {
      const founded = await db.College.findByPk(colg_id)
      if (founded) {
         const deleted = await db.College.destroy({ where: { colg_id: colg_id } })
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