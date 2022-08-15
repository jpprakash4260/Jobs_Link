const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class ResumeScoreValidation {

   create(req, res, next) {
      const resumescore_schema = Joi.object({
         resume_title: Joi.string().min(1).required(),
         resume_fdesc: Joi.string().min(1).required(),
         resume_sdesc: Joi.string().min(1).required(),
         first_image: Joi.string().min(1).required(),
         seo_title: Joi.string().min(1).required(),
         seo_description: Joi.string().min(1).required(),
         seo_keywords: Joi.string().min(1).required(),
         second_image: Joi.string().min(1).required(),
         resume_date: Joi.date().raw().required()
      })

      return BaseValidation.ResumeScoreBody(req, res, next, resumescore_schema)
   }

   update(req, res, next) {
      const resumescore_schema = Joi.object({
         resume_title: Joi.string().min(1),
         resume_fdesc: Joi.string().min(1),
         resume_sdesc: Joi.string().min(1),
         first_image: Joi.string().min(1),
         seo_title: Joi.string().min(1),
         seo_description: Joi.string().min(1),
         seo_keywords: Joi.string().min(1),
         second_image: Joi.string().min(1),
         resume_date: Joi.date().raw()
      })

      return BaseValidation.ResumeScoreBody(req, res, next, resumescore_schema)
   }
}

module.exports = new ResumeScoreValidation();
