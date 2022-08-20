const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class OperatorValidation {

   create(req, res, next) {
      const operator_schema = Joi.object({
         op_type: Joi.string().valid('O', 'A').max(1).required(),
         op_name: Joi.string().min(1).required(),
         op_uname: Joi.string().min(1).required(),
         op_password: Joi.string().min(1).required(),
         feat_id: Joi.string().min(1).required(),
         op_dt: Joi.date().raw().required(),
         op_status: Joi.string().valid('Y', 'N', 'D').max(1).required()
      })

      return BaseValidation.validateBody(req, res, next, operator_schema)
   }

   update(req, res, next) {
      const operator_schema = Joi.object({
         op_type: Joi.string().valid('O', 'A').max(1),
         op_name: Joi.string().min(1),
         op_uname: Joi.string().min(1),
         op_password: Joi.string().min(1),
         feat_id: Joi.string().min(1),
         op_dt: Joi.date().raw(),
         op_status: Joi.string().valid('Y', 'N', 'D').max(1)
      })

      return BaseValidation.validateBody(req, res, next, operator_schema)
   }
}

module.exports = new OperatorValidation();
