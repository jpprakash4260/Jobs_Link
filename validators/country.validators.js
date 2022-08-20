const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CountryValidation {

   create(req, res, next) {
      const country_schema = Joi.object({
         id: Joi.number().min(1).required(),
         iso: Joi.string().min(1).required(),
         country_name: Joi.string().min(1).required(),
         country_slug: Joi.string().min(1).required(),
         nicename: Joi.string().min(1).required(),
         iso3: Joi.string().min(1).required(),
         numcode: Joi.number().min(1).required(),
         phonecode: Joi.number().min(1).required(),
         country_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         foot_status: Joi.string().valid('Y', 'N').max(1).required()
      })

      return BaseValidation.validateBody(req, res, next, country_schema)
   }

   update(req, res, next) {
      const country_schema = Joi.object({
         id: Joi.number().min(1),
         iso: Joi.string().min(1),
         country_name: Joi.string().min(1),
         country_slug: Joi.string().min(1),
         nicename: Joi.string().min(1),
         iso3: Joi.string().min(1),
         numcode: Joi.number().min(1),
         phonecode: Joi.number().min(1),
         country_status: Joi.string().valid('Y', 'N', 'D').max(1),
         foot_status: Joi.string().valid('Y', 'N').max(1)
      })

      return BaseValidation.validateBody(req, res, next, country_schema)
   }
}

module.exports = new CountryValidation();
