const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class JobHistoryValidation {

   create(req, res, next) {
      const jobhistory_schema = Joi.object({
         job_type: Joi.string().valid('P', 'G').max(1).required(),
         job_id: Joi.number().min(1).required(),
         del_by: Joi.string().min(1).required(),
         del_name: Joi.string().min(1).required(),
         del_type: Joi.string().min(1).required(),
         status_from: Joi.string().min(1).required(),
         to_status: Joi.string().min(1).required(),
         ipaddress: Joi.string().min(1).required(),
         del_date: Joi.date().raw().required()
      })

      return BaseValidation.JobHistoryBody(req, res, next, jobhistory_schema)
   }

   update(req, res, next) {
      const jobhistory_schema = Joi.object({
         job_type: Joi.string().valid('P', 'G').max(1),
         job_id: Joi.number().min(1),
         del_by: Joi.string().min(1),
         del_name: Joi.string().min(1),
         del_type: Joi.string().min(1),
         status_from: Joi.string().min(1),
         to_status: Joi.string().min(1),
         ipaddress: Joi.string().min(1),
         del_date: Joi.date().raw()
      })

      return BaseValidation.JobHistoryBody(req, res, next, jobhistory_schema)
   }
}

module.exports = new JobHistoryValidation();
