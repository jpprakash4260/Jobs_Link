const { valid } = require('joi');
const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class AdminValidation {
   create(req, res, next) {
      const admin_schema = Joi.object({
         admin_name: Joi.string().min(3).required(),
         admin_pass: Joi.string().min(6).required(),
         admin_status: Joi.string().min(1).required(),
         sitename: Joi.string().min(1).required(),
         set_url: Joi.string().min(1).required(),
         setting_fields: Joi.string().min(1).required(),
         setting_operator: Joi.string().valid('Y', 'N').max(1).required(),
         setting_logo: Joi.string().min(1).required(),
         setting_banner: Joi.string().min(1).required(),
         type: Joi.string().min(1).required(),
         explanation: Joi.string().min(1).required()
      })
      return BaseValidation.validateBody(req, res, next, admin_schema)
   }

   update(req, res, next) {
      const admin_schema = Joi.object({
         admin_name: Joi.string().min(3).required(),
         admin_pass: Joi.string().min(6).required(),
         admin_status: Joi.string().min(1).required(),
         sitename: Joi.string().min(1),
         set_url: Joi.string().min(1),
         setting_fields: Joi.string().min(1),
         setting_operator: Joi.string().valid('Y', 'N').max(1),
         setting_logo: Joi.string().min(1),
         setting_banner: Joi.string().min(1),
         type: Joi.string().min(1),
         explanation: Joi.string().min(1)
      })
      return BaseValidation.validateBody(req, res, next, admin_schema)
   }
}

module.exports = new AdminValidation();
