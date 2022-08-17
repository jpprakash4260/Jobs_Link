'use strict'
const db = require("../Models")

class AdminMenuService { }

AdminMenuService.create = async (obj) => {
   try {
      const saved = await db.AdminMenu.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

AdminMenuService.findAllAndCount = async (menu_id) => {
   try {
      const findAllandCount = await db.AdminMenu.findAndCountAll({ where: { menu_link: menu_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

AdminMenuService.getAdminDetails = async (menu_id, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__adminmenu as a 
                where 
                a.menu_id=${menu_id} and a.menu_status='Y'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   }
   catch (error) {
      return error
   }
}

AdminMenuService.findByPk = async (menu_id) => {
   try {
      const findByPk = await db.AdminMenu.findByPk(menu_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

AdminMenuService.update = async (menu_id, obj) => {
   try {

      const ext_AdminMenu = await db.AdminMenu.findOne({ where: obj })

      if (ext_AdminMenu && menu_id == ext_AdminMenu.menu_id) {

         return 'Exited Values'
      }
      else if (!ext_AdminMenu || (ext_AdminMenu && menu_id != ext_AdminMenu.menu_id)) {

         const updateById = await db.AdminMenu.update(obj, { where: { menu_id: menu_id } })
         return updateById[0]

      }
      else return 'AdminMenu Not Found'
   }
   catch (err) {
      return err
   }
}

AdminMenuService.delete = async (menu_id) => {
   try {
      const founded = await db.AdminMenu.findByPk(menu_id)
      if (founded) {
         const deleted = await db.AdminMenu.destroy({ where: { menu_id: menu_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = AdminMenuService