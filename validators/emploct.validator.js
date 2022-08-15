const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EmplocationValidation {

   create(req, res, next) {
      const emplocat_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         emp_country: Joi.number().min(1).required(),
         emp_state: Joi.number().min(1).required(),
         emp_city: Joi.number().min(1).required(),
         locat_status: Joi.string().valid('Y', 'D').max(1).required(),
         locat_date: Joi.date().raw().required()
      })

      return BaseValidation.EmplocationBody(req, res, next, emplocat_schema)
   }

   update(req, res, next) {
      const emplocat_schema = Joi.object({
         emp_id: Joi.number().min(1),
         emp_country: Joi.number().min(1),
         emp_state: Joi.number().min(1),
         emp_city: Joi.number().min(1),
         locat_status: Joi.string().valid('Y', 'D').max(1),
         locat_date: Joi.date().raw()
      })

      return BaseValidation.EmplocationBody(req, res, next, emplocat_schema)
   }
}

module.exports = new EmplocationValidation();
