const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CollegeValidation {

   create(req, res, next) {
      const college_schema = Joi.object({
         pid: Joi.number().min(1).required(),
         gcat_name: Joi.number().min(1).required(),
         gcat_slug: Joi.string().min(1).required(),
         gcat_code: Joi.string().min(1).required(),
         gcat_icon: Joi.string().min(1).required(),
         gcat_desc: Joi.string().min(1).required(),
         gcat_image: Joi.string().min(1).required(),
         gcat_pos: Joi.number().min(1).required(),
         gcat_status: Joi.number().valid('Y', 'N', 'D').max(1).required(),
         foot_status: Joi.string().valid('Y', 'N').max(1).required(),
         gcat_dt: Joi.date().raw().required()
      })

      return BaseValidation.CollegeBody(req, res, next, college_schema)
   }

   update(req, res, next) {
      const college_schema = Joi.object({
         pid: Joi.number().min(1),
         gcat_name: Joi.number().min(1),
         gcat_slug: Joi.string().min(1),
         gcat_code: Joi.string().min(1),
         gcat_icon: Joi.string().min(1),
         gcat_desc: Joi.string().min(1),
         gcat_image: Joi.string().min(1),
         gcat_pos: Joi.number().min(1),
         gcat_status: Joi.number().valid('Y', 'N', 'D').max(1),
         foot_status: Joi.string().valid('Y', 'N').max(1),
         gcat_dt: Joi.date().raw()
      })

      return BaseValidation.CollegeBody(req, res, next, college_schema)
   }
}

module.exports = new CollegeValidation();
