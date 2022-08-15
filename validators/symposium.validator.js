const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class SymposiumValidation {

   create(req, res, next) {
      const symposium_schema = Joi.object({
         symp_title: Joi.string().min(1).required(),
         symp_image: Joi.string().min(1).required(),
         symp_date: Joi.date().raw().required(),
         symp_desc: Joi.string().min(1).required(),
         symp_venue: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         symp_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         added_date: Joi.date().raw().required()
      })

      return BaseValidation.SymposiumBody(req, res, next, symposium_schema)
   }

   update(req, res, next) {
      const symposium_schema = Joi.object({
         symp_title: Joi.string().min(1),
         symp_image: Joi.string().min(1),
         symp_date: Joi.date().raw(),
         symp_desc: Joi.string().min(1),
         symp_venue: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         symp_status: Joi.string().valid('Y', 'N', 'D').max(1),
         added_date: Joi.date().raw()
      })

      return BaseValidation.SymposiumBody(req, res, next, symposium_schema)
   }
}

module.exports = new SymposiumValidation();
