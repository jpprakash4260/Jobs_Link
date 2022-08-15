const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class ExperinceValidation {

   create(req, res, next) {
      const experince_schema = Joi.object({
         exp_name: Joi.string().min(1).required(),
         exp_slug: Joi.string().min(1).required(),
         exp_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         exp_date: Joi.date().raw().required()
      })

      return BaseValidation.ExperinceBody(req, res, next, experince_schema)
   }

   update(req, res, next) {
      const experince_schema = Joi.object({
         exp_name: Joi.string().min(1),
         exp_slug: Joi.string().min(1).required(),
         exp_status: Joi.string().valid('Y', 'N', 'D').max(1),
         exp_date: Joi.date().raw()
      })

      return BaseValidation.ExperinceBody(req, res, next, experince_schema)
   }
}

module.exports = new ExperinceValidation();
