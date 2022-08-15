const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EmpofficialDetailsValidation {

   create(req, res, next) {
      const empoffdetails_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         emp_desig: Joi.string().min(1).required(),
         emp_org: Joi.string().min(1).required(),
         cur_comp: Joi.string().min(1).required(),
         exp_yr: Joi.string().min(1).required(),
         exp_month: Joi.string().min(1).required(),
         exp_yr_to: Joi.string().min(1).required(),
         exp_month_to: Joi.string().min(1).required(),
         sal_type: Joi.string().min(1).required(),
         sal_lakhs: Joi.string().min(1).required(),
         sal_thousand: Joi.string().min(1).required(),
         emp_detail: Joi.string().min(1).required(),
         wrk_status: Joi.string().min(1).required(),
         wrk_date: Joi.date().raw().required()
      })

      return BaseValidation.EmpoffdetailsBody(req, res, next, empoffdetails_schema)
   }

   update(req, res, next) {
      const empoffdetails_schema = Joi.object({
         emp_id: Joi.number().min(1),
         emp_desig: Joi.string().min(1),
         emp_org: Joi.string().min(1),
         cur_comp: Joi.string().min(1),
         exp_yr: Joi.string().min(1),
         exp_month: Joi.string().min(1),
         exp_yr_to: Joi.string().min(1),
         exp_month_to: Joi.string().min(1),
         sal_type: Joi.string().min(1),
         sal_lakhs: Joi.string().min(1),
         sal_thousand: Joi.string().min(1),
         emp_detail: Joi.string().min(1),
         wrk_status: Joi.string().min(1),
         wrk_date: Joi.date().raw()
      })

      return BaseValidation.EmpoffdetailsBody(req, res, next, empoffdetails_schema)
   }
}

module.exports = new EmpofficialDetailsValidation();
