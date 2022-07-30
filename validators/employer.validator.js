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
   employerVerifyEmail(req, res, next) {
      const employer_schema = Joi.object({
         mail_id: Joi.string().email().required(),
         email_otp: Joi.number().min(6).required()
      });
      return BaseValidation.validateEmployeeVerifyBody(req, res, next, employer_schema);
   }

   employerVerifyMobile(req, res, next) {
      const employer_schema = Joi.object({
         mail_id: Joi.string().email().required(),
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

   empChangePassword(req, res, next) {
      const employer_schema = Joi.object({
         comp_pass: Joi.string().min(6).required(),
         new_pass: Joi.string().min(6).required(),
         reNew_pass: Joi.string().min(6).required().valid(Joi.ref('new_pass'))
      });
      return BaseValidation.validateChangePasswordBody(req, res, next, employer_schema);
   }

   empPostJob(req, res, next) {
      const employer_schema = Joi.object({
         apply: Joi.string().min(1).max(1),
         unrest_jcat: Joi.number().min(1).required(),
         unrest_jsubcat: Joi.number().min(1).required(),
         unrest_jquali: Joi.string().min(1),
         unrest_jallow: Joi.string().min(1),
         unrest_jdesc: Joi.string().min(1),
         country_id: Joi.number().min(1).required(),
         state: Joi.number().min(1).required(),
         unrest_jloct: Joi.number().min(1).required(),
         unrest_jcompany: Joi.string().min(4),
         comp_detail: Joi.string().min(5),
         comp_address: Joi.string().min(5),
         unrest_jemail: Joi.string().email(),
         unrest_jphone: Joi.string().min(10),
         jtype_id: Joi.number().min(1).required(),
         sal_id: Joi.number().min(1).required(),
         job_exp: Joi.number().min(1),
         exp_date: Joi.date().required(),
         no_of_openings: Joi.string().min(1),
         unrest_landline: Joi.string().min(1),
         key_skills: Joi.string().min(1)
      });
      return BaseValidation.validateChangePasswordBody(req, res, next, employer_schema);
   }
}

module.exports = new EmployeeValidation();
