const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class NotificationValidation {

   create(req, res, next) {
      const notification_schema = Joi.object({
         noti_title: Joi.string().min(1).required(),
         noti_msg: Joi.string().min(1).required(),
         chat_id: Joi.number().min(1).required(),
         noti_type: Joi.string().valid('JOB', 'CHAT').max(1).required(),
         job_applyid: Joi.number().min(1).required(),
         noti_from: Joi.number().min(1).required(),
         noti_ftype: Joi.string().min(1).required(),
         noti_to: Joi.number().min(1).required(),
         noti_date: Joi.date().raw().required(),
         noti_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         noti_status: Joi.string().valid('Y', 'N').max(1).required()
      })

      return BaseValidation.NotificationBody(req, res, next, notification_schema)
   }

   update(req, res, next) {
      const notification_schema = Joi.object({
         noti_title: Joi.string().min(1),
         noti_msg: Joi.string().min(1),
         chat_id: Joi.number().min(1),
         noti_type: Joi.string().valid('JOB', 'CHAT').max(1),
         job_applyid: Joi.number().min(1),
         noti_from: Joi.number().min(1),
         noti_ftype: Joi.string().min(1),
         noti_to: Joi.number().min(1),
         noti_date: Joi.date().raw(),
         noti_status: Joi.string().valid('Y', 'N', 'D').max(1),
         noti_status: Joi.string().valid('Y', 'N').max(1)
      })

      return BaseValidation.NotificationBody(req, res, next, notification_schema)
   }
}

module.exports = new NotificationValidation();
