const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CampusValidation {
   create(req, res, next) {
      const campus_schema = Joi.object({
         notify: Joi.string().max(1).required(),
         camp_title: Joi.string().min(1).required(),
         camp_date: Joi.date().required(),
         camp_org: Joi.string().min(1).required(),
         camp_venue: Joi.string().min(1).required(),
         camp_logo: Joi.string().min(1).required(),
         camp_qualif: Joi.string().min(1).required(),
         camp_exp: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         camp_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         added_date: Joi.date().raw().required()
      })
      return BaseValidation.CampusBody(req, res, next, campus_schema)
   }

   update(req, res, next) {
      const campus_schema = Joi.object({
         notify: Joi.string().max(1),
         camp_title: Joi.string().min(1),
         camp_date: Joi.date(),
         camp_org: Joi.string().min(1),
         camp_venue: Joi.string().min(1),
         camp_logo: Joi.string().min(1),
         camp_qualif: Joi.string().min(1),
         camp_exp: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         camp_status: Joi.string().valid('Y', 'N', 'D').max(1),
         added_date: Joi.date().raw()
      })
      return BaseValidation.CampusBody(req, res, next, campus_schema)
   }
}

module.exports = new CampusValidation();
