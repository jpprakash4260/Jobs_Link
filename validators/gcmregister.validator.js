const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class GcmRegisterValidation {

   create(req, res, next) {
      const gcmregister_schema = Joi.object({
         user_id: Joi.string().min(1).required(),
         gcm_id: Joi.string().min(1).required(),
         device_type: Joi.string().min(1).required(),
         gcm_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         gcm_dt: Joi.date().raw().required()
      })

      return BaseValidation.GcmRegisterBody(req, res, next, gcmregister_schema)
   }

   update(req, res, next) {
      const gcmregister_schema = Joi.object({
         user_id: Joi.string().min(1),
         gcm_id: Joi.string().min(1),
         device_type: Joi.string().min(1),
         gcm_status: Joi.string().valid('Y', 'N', 'D').max(1),
         gcm_dt: Joi.date().raw()
      })

      return BaseValidation.GcmRegisterBody(req, res, next, gcmregister_schema)
   }
}

module.exports = new GcmRegisterValidation();
