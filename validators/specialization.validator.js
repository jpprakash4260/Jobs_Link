const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class SpecializationValidation {

   create(req, res, next) {
      const specialization_schema = Joi.object({
         qual_id: Joi.string().min(1).required(),
         course_id: Joi.string().min(1).required(),
         speclz_name: Joi.string().min(1).required(),
         speclz_slug: Joi.string().min(1).required(),
         speclz_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         speclz_date: Joi.date().raw().required()
      })

      return BaseValidation.SpecializationBody(req, res, next, specialization_schema)
   }

   update(req, res, next) {
      const specialization_schema = Joi.object({
         qual_id: Joi.string().min(1),
         course_id: Joi.string().min(1),
         speclz_name: Joi.string().min(1),
         speclz_slug: Joi.string().min(1),
         speclz_status: Joi.string().valid('Y', 'N', 'D').max(1),
         speclz_date: Joi.date().raw()
      })

      return BaseValidation.SpecializationBody(req, res, next, specialization_schema)
   }
}

module.exports = new SpecializationValidation();
