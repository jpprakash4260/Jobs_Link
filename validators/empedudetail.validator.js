const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class EmpedudetailValidation {

   create(req, res, next) {
      const empedudetail_schema = Joi.object({
         emp_id: Joi.number().min(1).required(),
         high_qualif: Joi.number().min(1).required(),
         high_course: Joi.number().min(1).required(),
         high_special: Joi.number().min(1).required(),
         high_college: Joi.number().min(1).required(),
         colg_name: Joi.string().min(1).required(),
         high_pass_yr: Joi.number().min(1).required(),
         edudate: Joi.date().raw().required()
      })

      return BaseValidation.EmpEduDetailBody(req, res, next, empedudetail_schema)
   }

   update(req, res, next) {
      const empedudetail_schema = Joi.object({
         emp_id: Joi.number().min(1),
         high_qualif: Joi.number().min(1),
         high_course: Joi.number().min(1),
         high_special: Joi.number().min(1),
         high_college: Joi.number().min(1),
         colg_name: Joi.string().min(1),
         high_pass_yr: Joi.number().min(1),
         edudate: Joi.date().raw()
      })

      return BaseValidation.EmpEduDetailBody(req, res, next, empedudetail_schema)
   }
}

module.exports = new EmpedudetailValidation();
