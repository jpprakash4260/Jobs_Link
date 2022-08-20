const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class StateValidation {

   create(req, res, next) {
      const state_schema = Joi.object({
         country_id: Joi.number().min(1).required(),
         state_name: Joi.string().min(1).required(),
         country_code: Joi.string().min(1).required(),
         state_status: Joi.string().valid('Y', 'N', 'D').max(1).required()
      })

      return BaseValidation.validateBody(req, res, next, state_schema)
   }

   update(req, res, next) {
      const state_schema = Joi.object({
         colg_name: Joi.string().min(1),
         colg_slug: Joi.string().min(1),
         colg_pos: Joi.number().min(1),
         colg_status: Joi.string().valid('Y', 'N', 'D').max(1),
         colg_date: Joi.date()
      })

      return BaseValidation.validateBody(req, res, next, state_schema)
   }
}

module.exports = new StateValidation();
