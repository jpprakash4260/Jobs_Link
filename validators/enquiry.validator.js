const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EnquiryValidation {

   create(req, res, next) {
      const enquiry_schema = Joi.object({
         enq_name: Joi.string().min(1).required(),
         enq_email: Joi.string().min(1).required(),
         enq_mobile: Joi.number().min(1).required(),
         enq_msg: Joi.string().min(1).required(),
         enq_date: Joi.date().raw().required(),
         ipaddress: Joi.string().min(1).required(),
         enq_altmobile: Joi.string().min(1).required(),
         maincat: Joi.number().min(1).required(),
         type_home: Joi.string().min(1).required(),
         type_bhk: Joi.string().min(1).required(),
         enq_loc: Joi.string().min(1).required()
      })

      return BaseValidation.validateBody(req, res, next, enquiry_schema)
   }

   update(req, res, next) {
      const enquiry_schema = Joi.object({
         enq_name: Joi.string().min(1),
         enq_email: Joi.string().min(1),
         enq_mobile: Joi.number().min(1),
         enq_msg: Joi.string().min(1),
         enq_date: Joi.date().raw(),
         ipaddress: Joi.string().min(1),
         enq_altmobile: Joi.string().min(1),
         maincat: Joi.number().min(1),
         type_home: Joi.string().min(1),
         type_bhk: Joi.string().min(1),
         enq_loc: Joi.string().min(1)
      })

      return BaseValidation.validateBody(req, res, next, enquiry_schema)
   }
}

module.exports = new EnquiryValidation();
