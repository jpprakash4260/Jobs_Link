const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class ChatValidation {
   create(req, res, next) {
      const chat_schema = Joi.object({
         job_id: Joi.number().min(1).required(),
         applyid: Joi.number().min(1).required(),
         chat_from: Joi.number().min(1).required(),
         chat_fname: Joi.string().min(1).required(),
         chat_ftype: Joi.string().min(1).required(),
         chat_to: Joi.number().min(1).required(),
         chat_tname: Joi.string().min(1).required(),
         chat_ttype: Joi.string().min(1).required(),
         chat_msg: Joi.string().min(1).required(),
         chat_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         chat_date: Joi.date().raw().required(),
         read_status: Joi.string().valid('W', 'Y').max(1).required(),
         read_date: Joi.date().raw().required(),
         ipaddr: Joi.string().min(1).required()
      })
      return BaseValidation.ChatBody(req, res, next, chat_schema)
   }

   update(req, res, next) {
      const chat_schema = Joi.object({
         job_id: Joi.number().min(1),
         applyid: Joi.number().min(1),
         chat_from: Joi.number().min(1),
         chat_fname: Joi.string().min(1),
         chat_ftype: Joi.string().min(1),
         chat_to: Joi.number().min(1),
         chat_tname: Joi.string().min(1),
         chat_ttype: Joi.string().min(1),
         chat_msg: Joi.string().min(1),
         chat_status: Joi.string().valid('Y', 'N', 'D').max(1),
         chat_date: Joi.date().raw(),
         read_status: Joi.string().valid('W', 'Y').max(1),
         read_date: Joi.date().raw(),
         ipaddr: Joi.string().min(1)
      })
      return BaseValidation.ChatBody(req, res, next, chat_schema)
   }
}

module.exports = new ChatValidation();
