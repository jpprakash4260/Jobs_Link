const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class KeySkillsValidation {

   create(req, res, next) {
      const keyskills_schema = Joi.object({
         keysk_name: Joi.string().min(1).required(),
         keysk_slug: Joi.string().min(1).required(),
         keysk_code: Joi.string().min(1).required(),
         keysk_pos: Joi.string().min(1).required(),
         keysk_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         keysk_dt: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, keyskills_schema)
   }

   update(req, res, next) {
      const keyskills_schema = Joi.object({
         keysk_name: Joi.string().min(1),
         keysk_slug: Joi.string().min(1),
         keysk_code: Joi.string().min(1),
         keysk_pos: Joi.string().min(1),
         keysk_status: Joi.string().valid('Y', 'N', 'D').max(1),
         keysk_dt: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, keyskills_schema)
   }
}

module.exports = new KeySkillsValidation();
