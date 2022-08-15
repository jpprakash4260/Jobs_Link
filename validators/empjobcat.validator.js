const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EmpjobcatValidation {

   create(req, res, next) {
      const empjobcat_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         cat_id: Joi.number().min(1).required(),
         subcat_id: Joi.number().min(1).required(),
         mjcat_status: Joi.string().valid('Y', 'D').max(1).required(),
         mjcat_date: Joi.date().min(1).required()
      })

      return BaseValidation.EmpJobcatBody(req, res, next, empjobcat_schema)
   }

   update(req, res, next) {
      const empjobcat_schema = Joi.object({
         emp_id: Joi.number().min(1),
         cat_id: Joi.number().min(1),
         subcat_id: Joi.number().min(1),
         mjcat_status: Joi.string().valid('Y', 'D').max(1),
         mjcat_date: Joi.date().min(1)
      })

      return BaseValidation.EmpJobcatBody(req, res, next, empjobcat_schema)
   }
}

module.exports = new EmpjobcatValidation();
