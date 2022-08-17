'use strict'
const db = require("../Models")
const moment = require('moment')


class AdminService { }

AdminService.create = async (obj) => {
   try {
      const saved = await db.Admin.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

AdminService.findAllAndCount = async (admin_id) => {
   try {
      const findAllandCount = await db.Admin.findAndCountAll({ where: { admin_id: admin_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

AdminService.getAdminDetails = async (admin_id, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__admin as a 
                where 
                a.admin_id=${admin_id} and a.admin_status='Y'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   }
   catch (error) {
      return error
   }
}

AdminService.findByPk = async (admin_id) => {
   try {
      const findByPk = await db.Admin.findByPk(admin_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

AdminService.update = async (admin_id, obj) => {
   try {
      const ext_college = await db.College.findOne({ where: obj })

      if (ext_college && colg_id == ext_college.colg_id) {

         return 'Exited Values'
      }
      else if (!ext_college || (ext_college && colg_id != ext_college.colg_id)) {

         const updateById = await db.College.update(obj, { where: { colg_id: colg_id } })
         return updateById[0]

      }
      else return 'College Not Found'
   }
   catch (err) {
      return err
   }
}

AdminService.delete = async (admin_id) => {
   try {
      const founded = await db.Admin.findByPk(admin_id)
      if (founded) {
         const deleted = await db.Admin.destroy({ where: { admin_id: admin_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   }
   catch (err) {
      return err
   }
}


module.exports = AdminService