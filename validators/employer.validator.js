const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation");

class EmployeeValidation {
   employerRegister(req, res, next) {
      const employer_schema = Joi.object({
         comp_name: Joi.string().min(5).required(),
         mail_id: Joi.string().email().required(),
         mobile_no: Joi.string().min(10).required(),
         cont_person: Joi.string().min(3).required(),
         indust_id: Joi.number().min(1).required(),
         comp_pass: Joi.string().min(4).required(),
         pincode: Joi.number().min(4).required(),
         country_id: Joi.number().min(1).required(),
         state_id: Joi.number().min(1).required(),
         unrest_jloct: Joi.number().min(1).required(),
         recut_address: Joi.string().min(5).required(),
         recut_desc: Joi.string().min(10).required()
      });
      return BaseValidation.validateEmployeeRegisterBody(req, res, next, employer_schema);
   };
   employerVerify(req, res, next) {
      const employer_schema = Joi.object({
         mail_id: Joi.string().email().required(),
         mail_otp: Joi.number().min(6).required(),
         mobile_otp: Joi.number().min(6).required()
      });
      return BaseValidation.validateEmployeeVerifyBody(req, res, next, employer_schema);
   }
   employerLogin(req, res, next) {
      const employer_schema = Joi.object({
         mail_id: Joi.string().email().required(),
         comp_pass: Joi.string().min(6).required()
      });
      return BaseValidation.validateEmployeeLoginBody(req, res, next, employer_schema);
   }

   empforgotPassword(req, res, next) {
      const employer_schema = Joi.object({
         mail_id: Joi.string().email().required()
      });
      return BaseValidation.validateForgotPasswordBody(req, res, next, employer_schema);
   }
}

module.exports = new EmployeeValidation();
