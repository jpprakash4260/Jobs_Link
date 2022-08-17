const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CourseValidation {

   create(req, res, next) {
      const course_schema = Joi.object({
         qual_id: Joi.number().min(1).required(),
         course_name: Joi.string().min(1).required(),
         course_slug: Joi.string().min(1).required(),
         course_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         course_date: Joi.date().raw().required()
      })

      return BaseValidation.CourseBody(req, res, next, course_schema)
   }

   update(req, res, next) {
      const course_schema = Joi.object({
         qual_id: Joi.number().min(1),
         course_name: Joi.string().min(1),
         course_slug: Joi.string().min(1),
         course_status: Joi.string().valid('Y', 'N', 'D').max(1),
         course_date: Joi.date().raw()
      })

      return BaseValidation.CourseBody(req, res, next, course_schema)
   }
}

module.exports = new CourseValidation();
