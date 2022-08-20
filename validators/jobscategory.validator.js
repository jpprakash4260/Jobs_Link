const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class JobsCategoryValidation {

   create(req, res, next) {
      const jobscategory_schema = Joi.object({
         pid: Joi.number().min(1).required(),
         jcat_name: Joi.string().min(1).required(),
         jcat_slug: Joi.string().min(1).required(),
         jcat_code: Joi.string().min(1).required(),
         jcat_icon: Joi.string().min(1).required(),
         jcat_desc: Joi.string().min(1).required(),
         jcat_image: Joi.string().min(1).required(),
         jcat_pos: Joi.number().min(1).required(),
         jcat_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         foot_status: Joi.string().valid('Y', 'N').max(1).required(),
         jcat_dt: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, jobscategory_schema)
   }

   update(req, res, next) {
      const jobscategory_schema = Joi.object({
         pid: Joi.number().min(1),
         jcat_name: Joi.string().min(1),
         jcat_slug: Joi.string().min(1),
         jcat_code: Joi.string().min(1),
         jcat_icon: Joi.string().min(1),
         jcat_desc: Joi.string().min(1),
         jcat_image: Joi.string().min(1),
         jcat_pos: Joi.number().min(1),
         jcat_status: Joi.string().valid('Y', 'N', 'D').max(1),
         foot_status: Joi.string().valid('Y', 'N').max(1),
         jcat_dt: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, jobscategory_schema)
   }
}

module.exports = new JobsCategoryValidation();
