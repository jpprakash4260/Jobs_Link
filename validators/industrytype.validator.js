const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class IndustryTypeValidation {

   create(req, res, next) {
      const industryType_schema = Joi.object({
         indust_name: Joi.string().min(1).required(),
         indust_slug: Joi.string().min(1).required(),
         indust_pos: Joi.number().min(1).required(),
         indust_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         indust_date: Joi.date().raw().required()
      })

      return BaseValidation.IndustryTyeBody(req, res, next, industryType_schema)
   }

   update(req, res, next) {
      const industryType_schema = Joi.object({
         indust_name: Joi.string().min(1),
         indust_slug: Joi.string().min(1),
         indust_pos: Joi.number().min(1),
         indust_status: Joi.string().valid('Y', 'N', 'D').max(1),
         indust_date: Joi.date().raw()
      })

      return BaseValidation.IndustryTyeBody(req, res, next, industryType_schema)
   }
}

module.exports = new IndustryTypeValidation();
