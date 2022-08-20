const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class IntScheduleValidation {

   create(req, res, next) {
      const intschedule_schema = Joi.object({
         applied_id: Joi.number().min(1).required(),
         emp_id: Joi.number().min(1).required(),
         company_id: Joi.number().min(1).required(),
         mail_title: Joi.string().min(1).required(),
         mail_content: Joi.string().min(1).required(),
         ipaddress: Joi.string().min(1).required(),
         mail_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, intschedule_schema)
   }

   update(req, res, next) {
      const intschedule_schema = Joi.object({
         applied_id: Joi.number().min(1),
         emp_id: Joi.number().min(1),
         company_id: Joi.number().min(1),
         mail_title: Joi.string().min(1),
         mail_content: Joi.string().min(1),
         ipaddress: Joi.string().min(1),
         mail_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, intschedule_schema)
   }
}

module.exports = new IntScheduleValidation();
