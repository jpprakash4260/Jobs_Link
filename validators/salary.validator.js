const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class SalaryValidation {

   create(req, res, next) {
      const salary_schema = Joi.object({
         sal_name: Joi.string().min(1).required(),
         sal_slug: Joi.string().min(1).required(),
         min_sal: Joi.string().min(1).required(),
         max_sal: Joi.string().min(1).required(),
         sal_pos: Joi.number().min(1).required(),
         sal_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         sal_date: Joi.date().raw().required()
      })

      return BaseValidation.SalaryBody(req, res, next, salary_schema)
   }

   update(req, res, next) {
      const salary_schema = Joi.object({
         sal_name: Joi.string().min(1),
         sal_slug: Joi.string().min(1),
         min_sal: Joi.string().min(1),
         max_sal: Joi.string().min(1),
         sal_pos: Joi.number().min(1),
         sal_status: Joi.string().valid('Y', 'N', 'D').max(1),
         sal_date: Joi.date().raw()
      })

      return BaseValidation.SalaryBody(req, res, next, salary_schema)
   }
}

module.exports = new SalaryValidation();
