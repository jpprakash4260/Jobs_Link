const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CityValidation {

   create(req, res, next) {
      const city_schema = Joi.object({
         state_id: Joi.number().min(1).required(),
         country_id: Joi.number().min(1).required(),
         city_name: Joi.string().min(1).required(),
         city_slug: Joi.string().min(1).required(),
         city_code: Joi.string().min(1).required(),
         city_image: Joi.string().min(1).required(),
         city_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         foot_status: Joi.string().valid('Y', 'N').max(1).required()
      })

      return BaseValidation.validateBody(req, res, next, city_schema)
   }

   update(req, res, next) {
      const city_schema = Joi.object({
         state_id: Joi.number().min(1).required(),
         country_id: Joi.number().min(1).required(),
         city_name: Joi.string().min(1).required(),
         city_slug: Joi.string().min(1).required(),
         city_code: Joi.string().min(1).required(),
         city_image: Joi.string().min(1).required(),
         city_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         foot_status: Joi.string().valid('Y', 'N').max(1).required()
      })

      return BaseValidation.validateBody(req, res, next, city_schema)
   }
}

module.exports = new CityValidation();
