const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EntrepreneurshipValidation {

   create(req, res, next) {
      const entrepreneurship_schema = Joi.object({
         ent_title: Joi.string().min(1).required(),
         cond_by: Joi.string().min(1).required(),
         start_date: Joi.date().min(1).required(),
         ending_date: Joi.date().min(1).required(),
         ent_venue: Joi.string().min(1).required(),
         ent_eligible: Joi.string().min(1).required(),
         ent_email: Joi.string().min(1).required(),
         ent_phone: Joi.string().min(1).required(),
         ent_desc: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         reg_date: Joi.date().raw().required(),
         close_date: Joi.date().raw().required(),
         ent_status: Joi.string().valid('Y', 'N').max(1).required(),
         added_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, entrepreneurship_schema)
   }

   update(req, res, next) {
      const entrepreneurship_schema = Joi.object({
         ent_title: Joi.string().min(1),
         cond_by: Joi.string().min(1),
         start_date: Joi.date().min(1),
         ending_date: Joi.date().min(1),
         ent_venue: Joi.string().min(1),
         ent_eligible: Joi.string().min(1),
         ent_email: Joi.string().min(1),
         ent_phone: Joi.string().min(1),
         ent_desc: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         reg_date: Joi.date().raw(),
         close_date: Joi.date().raw(),
         ent_status: Joi.string().valid('Y', 'N').max(1),
         added_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, entrepreneurship_schema)
   }
}

module.exports = new EntrepreneurshipValidation();
