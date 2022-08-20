const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class QualificatioValidation {

   create(req, res, next) {
      const qualification_schema = Joi.object({
         qual_name: Joi.string().min(1).required(),
         qual_slug: Joi.string().min(1).required(),
         qual_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         qual_pos: Joi.number().min(1).required(),
         qual_dt: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, qualification_schema)
   }

   update(req, res, next) {
      const qualification_schema = Joi.object({
         qual_name: Joi.string().min(1),
         qual_slug: Joi.string().min(1),
         qual_status: Joi.string().valid('Y', 'N', 'D').max(1),
         qual_pos: Joi.number().min(1),
         qual_dt: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, qualification_schema)
   }
}

module.exports = new QualificatioValidation();
