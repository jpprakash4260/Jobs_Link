const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class ConferenceValidation {

   create(req, res, next) {
      const conference_schema = Joi.object({
         conf_title: Joi.string().min(1).required(),
         conf_image: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         start_date: Joi.date().raw().required(),
         exp_date: Joi.date().raw().required(),
         end_date: Joi.date().raw().required(),
         dead_line: Joi.date().raw().required(),
         enq_email: Joi.string().min(1).required(),
         conf_venue: Joi.string().min(1).required(),
         conf_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         added_date: Joi.date().raw().required()
      })

      return BaseValidation.ConferenceBody(req, res, next, conference_schema)
   }

   update(req, res, next) {
      const conference_schema = Joi.object({
         conf_title: Joi.string().min(1),
         conf_image: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         start_date: Joi.date().raw(),
         exp_date: Joi.date().raw(),
         end_date: Joi.date().raw(),
         dead_line: Joi.date().raw(),
         enq_email: Joi.string().min(1),
         conf_venue: Joi.string().min(1),
         conf_status: Joi.string().valid('Y', 'N', 'D').max(1),
         added_date: Joi.date().raw()
      })

      return BaseValidation.ConferenceBody(req, res, next, conference_schema)
   }
}

module.exports = new ConferenceValidation();
