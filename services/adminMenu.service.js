'use strict'
const db = require("../Models")
const moment = require('moment')

class AdminMenuService { }
AdminMenuService.createAdmin = async (req) => {
   try {
      const obj = {
         menu_title: req.body.menu_title,
         menu_type: req.body.menu_type,
         pid: req.body.pid,
         menu_link: req.body.menu_link,
         menu_icon: req.body.menu_icon,
         menu_home: req.body.menu_home,
         menu_pos: req.body.menu_pos,
         menu_status: req.body.menu_status
      }
      const saved_adminMenu = await db.AdminMenu.create(obj)
      return saved_adminMenu
   } catch (err) {
      return err
   }
}

AdminMenuService.findAllAndCount = async () => {
   try {
      const findAllandCount = await db.AdminMenu.findAndCountAll({})
      return findAllandCount
   } catch (err) {
      return err
   }
}

AdminMenuService.findOne = async (obj) => {
   try {
      const findOne = await db.AdminMenu.findOne({ where: obj })
      return findOne
   } catch (err) {
      return err
   }
}

AdminMenuService.findByPk = async (_id) => {
   try {
      const findByPk = await db.AdminMenu.findByPk(_id)
      return findByPk
   } catch (err) {
      return err
   }
}

AdminMenuService.updateById = async (_id, obj) => {
   try {
      const founded = await db.AdminMenu.findByPk(_id);
      let checked = 'same'
      for (let i = 0; i < Object.keys(obj).length; i++) {
         if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) {
            // console.log("new : " , Object.values(obj)[i], ", ext : ", founded[Object.keys(obj)[i]])
            continue
         } else checked = 'not same';
         // console.log("new : ", Object.values(obj)[i], ", ext : " , founded[Object.keys(obj)[i]])
         break
      }
      if (checked == 'not same') {
         obj.lastupdate = moment().format()
         const updateById = await db.AdminMenu.update(obj, { where: { menu_id: _id } })
         return updateById[0]
      }
      else return 'Exited Values'
   } catch (err) {
      return err
   }
}

AdminMenuService.updateStatus = async (_id, obj) => {
   try {
      const founded = await db.AdminMenu.findByPk(_id);
      let checked = 'same'
      for (let i = 0; i < Object.keys(obj).length; i++) {
         if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) {
            // console.log("new : " , Object.values(obj)[i], ", ext : ", founded[Object.keys(obj)[i]])
            continue
         } else checked = 'not same';
         // console.log("new : ", Object.values(obj)[i], ", ext : " , founded[Object.keys(obj)[i]])
         break
      }
      if (checked == 'not same') {
         obj.lastupdate = moment().format()
         const updateStatus = await db.AdminMenu.update(obj, { where: { menu_id: _id } })
         return updateStatus[0]
      }
      else return 'Exited Values'
   } catch (err) {
      console.log(err);
      return err
   }
}

AdminMenuService.delete = async (_id) => {
   try {
      const deleted = await db.AdminMenu.destroy({ where: { menu_id: _id } })
      return deleted
   } catch (err) {
      return err
   }
}


module.exports = AdminMenuService