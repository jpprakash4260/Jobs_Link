const { valid } = require('joi');
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
         chat_status: Joi.string().valid('Y', 'N', 'M').max(1).required(),
         chat_date: Joi.date().required(),
         read_status: Joi.string().valid('W', 'Y').min(1).required(),
         read_date: Joi.date().required(),
         ipaddr: Joi.string().min(1).required(),
         lastupdate: Joi.date(),
      })
      return BaseValidation.ChatBody(req, res, next, chat_schema)
   }

   update(req, res, next) {
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
         chat_status: Joi.string().valid('Y', 'N', 'M').max(1).required(),
         chat_date: Joi.date().required(),
         read_status: Joi.string().valid('W', 'Y').min(1).required(),
         read_date: Joi.date().required(),
         ipaddr: Joi.string().min(1).required(),
         lastupdate: Joi.date(),
      })
      return BaseValidation.ChatBody(req, res, next, chat_schema)
   }
}

module.exports = new ChatValidation();
