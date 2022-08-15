const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CollegeValidation {

   create(req, res, next) {
      const govjobnews_schema = Joi.object({
         gnews_name: Joi.string().min(1).required(),
         gnews_link: Joi.string().min(1).required(),
         gnews_pos: Joi.number().min(1).required(),
         gnews_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         gnews_date: Joi.date().raw().required()
      })

      return BaseValidation.GovjobnewsBody(req, res, next, govjobnews_schema)
   }

   update(req, res, next) {
      const govjobnews_schema = Joi.object({
         gnews_name: Joi.string().min(1),
         gnews_link: Joi.string().min(1),
         gnews_pos: Joi.number().min(1),
         gnews_status: Joi.string().valid('Y', 'N', 'D').max(1),
         gnews_date: Joi.date().raw()
      })

      return BaseValidation.GovjobnewsBody(req, res, next, govjobnews_schema)
   }
}

module.exports = new CollegeValidation();
