const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class Edu_CourseValidation {

   create(req, res, next) {
      const edu_course_schema = Joi.object({
         pid: Joi.number().min(1).required(),
         ecatid_sub: Joi.number().min(1).required(),
         ecat_type: Joi.string().valid('M', 'C', 'S').max(1).required(),
         ecat_name: Joi.string().min(1).required(),
         ecat_slug: Joi.string().min(1).required(),
         ecat_pos: Joi.number().min(1).required(),
         ecat_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         ecat_dt: Joi.date().raw().required()
      })

      return BaseValidation.Edu_CourseBody(req, res, next, edu_course_schema)
   }

   update(req, res, next) {
      const edu_course_schema = Joi.object({
         pid: Joi.number().min(1),
         ecatid_sub: Joi.number().min(1),
         ecat_type: Joi.string().valid('M', 'C', 'S').max(1),
         ecat_name: Joi.string().min(1),
         ecat_slug: Joi.string().min(1),
         ecat_pos: Joi.number().min(1),
         ecat_status: Joi.string().valid('Y', 'N', 'D').max(1),
         ecat_dt: Joi.date().raw()
      })

      return BaseValidation.Edu_CourseBody(req, res, next, edu_course_schema)
   }
}

module.exports = new Edu_CourseValidation();
