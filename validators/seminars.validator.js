const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class SeminarsValidation {

   create(req, res, next) {
      const seminars_schema = Joi.object({
         semi_title: Joi.string().min(1).required(),
         start_date: Joi.date().raw().required(),
         semi_org: Joi.string().min(1).required(),
         semi_venue: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         semi_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         added_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, seminars_schema)
   }

   update(req, res, next) {
      const seminars_schema = Joi.object({
         semi_title: Joi.string().min(1),
         start_date: Joi.date().raw(),
         semi_org: Joi.string().min(1),
         semi_venue: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         semi_status: Joi.string().valid('Y', 'N', 'D').max(1),
         added_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, seminars_schema)
   }
}

module.exports = new SeminarsValidation();
