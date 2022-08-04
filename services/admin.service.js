'use strict'
const db = require("../Models")
const moment = require('moment')

class AdminService { }
AdminService.createAdmin = async (req) => {
   try {
      const obj = {
         admin_name: req.body.admin_name,
         admin_pass: req.body.admin_pass,
         admin_status: req.body.admin_status,
         sitename: req.body.sitename,
         set_url: req.body.set_url,
         setting_fields: req.body.setting_fields,
         setting_operator: req.body.setting_operator,
         setting_logo: req.body.setting_logo,
         setting_banner: req.body.setting_banner,
         type: req.body.type,
         explanation: req.body.explanation
      }
      const saved_admin = await db.Admin.create(obj)
      return saved_admin
   } catch (err) {
      return err
   }
}

AdminService.findAllAndCount = async (req) => {
   try {
      const findAllandCount = await db.Admin.findAndCountAll({})
      return findAllandCount
   } catch (err) {
      return err
   }
}

AdminService.findOne = async (obj) => {
   try {
      const findOne = await db.Admin.findOne({ where: obj })
      return findOne
   } catch (err) {
      return err
   }
}

AdminService.findByPk = async (_id) => {
   try {
      const findByPk = await db.Admin.findByPk(_id)
      return findByPk
   } catch (err) {
      return err
   }
}

AdminService.updateById = async (_id, obj) => {
   try {
      const founded = await db.Admin.findByPk(_id);
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
         const updateById = await db.Admin.update(obj, { where: { admin_id: _id } })
         return updateById[0]
      }
      else return 2
   } catch (err) {
      return err
   }
}

AdminService.updateStatus = async (_id, obj) => {
   try {
      const founded = await db.Admin.findByPk(_id);
      let checked = 'same'
      for (let i = 0; i < Object.keys(obj).length; i++) {
         if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) {
            console.log("new : " , Object.values(obj)[i], ", ext : ", founded[Object.keys(obj)[i]])
            continue
         } else checked = 'not same';
         console.log("new : ", Object.values(obj)[i], ", ext : " , founded[Object.keys(obj)[i]])
         break
      }
      if (checked == 'not same') {
         obj.lastupdate = moment().format()
         const updateStatus = await db.Admin.update(obj, { where: { admin_id: _id } })
         console.log(updateStatus[0]);
         return updateStatus[0]
      }
      else return 'Exited Values'
   } catch (err) {
      return err
   }
}

AdminService.delete = async (_id) => {
   try {
      const deleted = await db.Admin.destroy({ where: { admin_id: _id }})
      return deleted
   } catch (err) {
      return err
   }
}


module.exports = AdminService