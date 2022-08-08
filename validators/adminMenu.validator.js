const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class AdminMenuValidation {
   create(req, res, next) {
      const adminMenu_schema = Joi.object({
         menu_title: Joi.string().min(3).required(),
         menu_type: Joi.string().min(6).required(),
         pid: Joi.number().min(1).required(),
         menu_link: Joi.string().min(1).required(),
         menu_icon: Joi.string().min(1).required(),
         menu_home: Joi.string().max(1).required(),
         menu_pos: Joi.number().min(1).required(),
         menu_status: Joi.string().max(1).required()
      })
      return BaseValidation.AdminMenuBody(req, res, next, adminMenu_schema)
   }

   update(req, res, next) {
      const adminMenu_schema = Joi.object({
         menu_title: Joi.string().min(3).required(),
         menu_type: Joi.string().min(6).required(),
         pid: Joi.number().min(1).required(),
         menu_link: Joi.string().min(1).required(),
         menu_icon: Joi.string().min(1).required(),
         menu_home: Joi.string().max(1).required(),
         menu_pos: Joi.number().min(1).required(),
         menu_status: Joi.string().max(1).required()
      })
      return BaseValidation.AdminMenuBody(req, res, next, adminMenu_schema)
   }
}

module.exports = new AdminMenuValidation();
