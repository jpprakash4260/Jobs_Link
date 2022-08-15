const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class WorkShopValidation {

   create(req, res, next) {
      const Workshop_schema = Joi.object({
         work_title: Joi.string().min(1).required(),
         work_image: Joi.string().min(1).required(),
         start_date: Joi.date().raw().required(),
         work_time: Joi.string().min(1).required(),
         work_venue: Joi.string().min(1).required(),
         notif_link: Joi.string().min(1).required(),
         work_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         added_date: Joi.date().raw().required(),
         about: Joi.string().min(1).required(),
         exp_date: Joi.date().raw().required()
      })

      return BaseValidation.WorkShopsBody(req, res, next, Workshop_schema)
   }

   update(req, res, next) {
      const Workshop_schema = Joi.object({
         work_title: Joi.string().min(1),
         work_image: Joi.string().min(1),
         start_date: Joi.date().raw(),
         work_time: Joi.string().min(1),
         work_venue: Joi.string().min(1),
         notif_link: Joi.string().min(1),
         work_status: Joi.string().valid('Y', 'N', 'D').max(1),
         added_date: Joi.date().raw(),
         about: Joi.string().min(1),
         exp_date: Joi.date().raw()
      })

      return BaseValidation.WorkShopsBody(req, res, next, Workshop_schema)
   }
}

module.exports = new WorkShopValidation();
