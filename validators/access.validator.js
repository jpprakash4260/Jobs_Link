const Joi = require('joi')

const BaseValidation = require("../middleware/baseValidation")

class AccessValidation {
   create(req, res, next) {
      const access_schema = Joi.object({
         access_key: Joi.string().min(1).required(),
         user_id: Joi.number().min(1).required(),
         user_type: Joi.string().valid('J', 'E').max(1).required(),
         access_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         access_expdt: Joi.date().raw().required(),
         access_dt: Joi.date().raw().required(),
      })
      return BaseValidation.validateBody(req, res, next, access_schema)
   }

   update(req, res, next) {
      const access_schema = Joi.object({
         access_key: Joi.string().min(1),
         user_id: Joi.number().min(1),
         user_type: Joi.string().valid('J', 'E').max(1),
         access_status: Joi.string().valid('Y', 'N', 'D').max(1),
         access_expdt: Joi.date().raw(),
         access_dt: Joi.date().raw()
      })
      return BaseValidation.validateBody(req, res, next, access_schema)
   }
}

module.exports = new AccessValidation()
