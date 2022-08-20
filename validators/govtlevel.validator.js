const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class GovtLevelValidation {

   create(req, res, next) {
      const govtlevel_schema = Joi.object({
         lev_name: Joi.string().min(1).required(),
         lev_pos: Joi.number().min(1).required(),
         lev_status: Joi.string().min(1).required(),
         lev_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, govtlevel_schema)
   }

   update(req, res, next) {
      const govtlevel_schema = Joi.object({
         lev_name: Joi.string().min(1),
         lev_pos: Joi.number().min(1),
         lev_status: Joi.string().min(1),
         lev_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, govtlevel_schema)
   }
}

module.exports = new GovtLevelValidation();
