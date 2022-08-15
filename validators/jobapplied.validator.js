const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class JobAppliedValidation {

   create(req, res, next) {
      const jobapplied_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         job_id: Joi.number().min(1).required(),
         company_id: Joi.number().min(1).required(),
         job_type: Joi.string().min(1).required(),
         appl_status: Joi.string().valid('W', 'A', 'C', 'H', 'R').max(1).required(),
         ipaddress: Joi.string().min(1).required(),
         applied_date: Joi.date().raw().required()
      })

      return BaseValidation.JobAppliedBody(req, res, next, jobapplied_schema)
   }

   update(req, res, next) {
      const jobapplied_schema = Joi.object({
         emp_id: Joi.number().min(1),
         job_id: Joi.number().min(1),
         company_id: Joi.number().min(1),
         job_type: Joi.string().min(1),
         appl_status: Joi.string().valid('W', 'A', 'C', 'H', 'R').max(1),
         ipaddress: Joi.string().min(1),
         applied_date: Joi.date().raw()
      })

      return BaseValidation.JobAppliedBody(req, res, next, jobapplied_schema)
   }
}

module.exports = new JobAppliedValidation();
