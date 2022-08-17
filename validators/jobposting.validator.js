const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class JobPostingValidation {

   create(req, res, next) {
      const jobposting_schema = Joi.object({
         job_code: Joi.string().min(1).required(),
         posted_by: Joi.number().min(1).required(),
         jcat_id: Joi.number().min(1).required(),
         jsub_id: Joi.number().min(1).required(),
         cont_mail: Joi.string().min(1).required(),
         cont_mob: Joi.number().min(1).required(),
         sal_range: Joi.number().min(1).required(),
         indust_id: Joi.number().min(1).required(),
         empl_type: Joi.number().min(1).required(),
         emp_educ: Joi.number().min(1).required(),
         emp_exp: Joi.number().min(1).required(),
         emp_specal: Joi.number().min(1).required(),
         job_desc: Joi.string().min(1).required(),
         job_status: Joi.string().valid('W', 'Y', 'N', 'D').max(1).required(),
         posted_type: Joi.string().min(1).required(),
         job_expdate: Joi.date().min(1).required(),
         ipaddress: Joi.string().min(1).required()
      })

      return BaseValidation.JobPostingBody(req, res, next, jobposting_schema)
   }

   update(req, res, next) {
      const jobposting_schema = Joi.object({
         job_code: Joi.string().min(1),
         posted_by: Joi.number().min(1),
         jcat_id: Joi.number().min(1),
         jsub_id: Joi.number().min(1),
         cont_mail: Joi.string().min(1),
         cont_mob: Joi.number().min(1),
         sal_range: Joi.number().min(1),
         indust_id: Joi.number().min(1),
         empl_type: Joi.number().min(1),
         emp_educ: Joi.number().min(1),
         emp_exp: Joi.number().min(1),
         emp_specal: Joi.number().min(1),
         job_desc: Joi.string().min(1),
         job_status: Joi.string().valid('W', 'Y', 'N', 'D').max(1),
         posted_type: Joi.string().min(1),
         job_expdate: Joi.date().min(1),
         ipaddress: Joi.string().min(1)
      })

      return BaseValidation.JobPostingBody(req, res, next, jobposting_schema)
   }
}

module.exports = new JobPostingValidation();
