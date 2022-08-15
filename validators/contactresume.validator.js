const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class ContactresumeValidation {

   create(req, res, next) {
      const contactresume_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         comp_id: Joi.number().min(1).required(),
         cont_type: Joi.string().valid('C', 'S').max(1).required(),
         cont_date: Joi.date().raw().required()
      })

      return BaseValidation.ContactResumeBody(req, res, next, contactresume_schema)
   }

   update(req, res, next) {
      const contactresume_schema = Joi.object({
         emp_id: Joi.number().min(1),
         comp_id: Joi.number().min(1),
         cont_type: Joi.string().valid('C', 'S').max(1),
         cont_date: Joi.date().raw()
      })

      return BaseValidation.ContactResumeBody(req, res, next, contactresume_schema)
   }
}

module.exports = new ContactresumeValidation();
