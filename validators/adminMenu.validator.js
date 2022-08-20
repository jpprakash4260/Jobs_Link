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
         menu_home: Joi.string().valid('Y', 'N').max(1).required(),
         menu_pos: Joi.number().min(1).required(),
         menu_status: Joi.string().valid('Y', 'N', 'D').max(1).required()
      })
      return BaseValidation.validateBody(req, res, next, adminMenu_schema)
   }

   update(req, res, next) {
      const adminMenu_schema = Joi.object({
         menu_title: Joi.string().min(3),
         menu_type: Joi.string().min(6),
         pid: Joi.number().min(1),
         menu_link: Joi.string().min(1),
         menu_icon: Joi.string().min(1),
         menu_home: Joi.string().valid('Y', 'N').max(1),
         menu_pos: Joi.number().min(1),
         menu_status: Joi.string().valid('Y', 'N', 'D').max(1)
      })
      return BaseValidation.validateBody(req, res, next, adminMenu_schema)
   }
}

module.exports = new AdminMenuValidation();
