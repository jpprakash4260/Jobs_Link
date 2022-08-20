const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class JobTypeValidation {

   create(req, res, next) {
      const JobType_schema = Joi.object({
         jtype_name: Joi.string().min(1).required(),
         jtype_status: Joi.string().min(1).required(),
         jtype_pos: Joi.number().min(1).required(),
         jtype_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, JobType_schema)
   }

   update(req, res, next) {
      const JobType_schema = Joi.object({
         jtype_name: Joi.string().min(1).required(),
         jtype_status: Joi.string().min(1).required(),
         jtype_pos: Joi.number().min(1).required(),
         jtype_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, JobType_schema)
   }
}

module.exports = new JobTypeValidation();
