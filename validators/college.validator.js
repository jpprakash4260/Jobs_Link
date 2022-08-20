const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CollegeValidation {

   create(req, res, next) {
      const college_schema = Joi.object({
         colg_name: Joi.string().min(1).required(),
         colg_slug: Joi.string().min(1).required(),
         colg_pos: Joi.number().min(1).required(),
         colg_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         colg_date: Joi.date()
      })

      return BaseValidation.validateBody(req, res, next, college_schema)
   }

   update(req, res, next) {
      const college_schema = Joi.object({
         colg_name: Joi.string().min(1),
         colg_slug: Joi.string().min(1),
         colg_pos: Joi.number().min(1),
         colg_status: Joi.string().valid('Y', 'N', 'D').max(1),
         colg_date: Joi.date()
      })

      return BaseValidation.validateBody(req, res, next, college_schema)
   }
}

module.exports = new CollegeValidation();
