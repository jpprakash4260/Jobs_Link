const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EmpkSkillsValidation {

   create(req, res, next) {
      const empkskills_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         keysk_id: Joi.number().min(1).required(),
         keysk_name: Joi.string().min(1).required(),
         empkskil_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         empkskil_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, empkskills_schema)
   }

   update(req, res, next) {
      const empkskills_schema = Joi.object({
         emp_id: Joi.number().min(1),
         keysk_id: Joi.number().min(1),
         keysk_name: Joi.string().min(1),
         empkskil_status: Joi.string().valid('Y', 'N', 'D').max(1),
         empkskil_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, empkskills_schema)
   }
}

module.exports = new EmpkSkillsValidation();
