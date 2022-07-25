const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation");

class SeekerValidation {
	seekerRegister(req, res, next){
		const seeker_schema = Joi.object({
			emp_name: Joi.string().min(5).required(),
			emp_email: Joi.string().email().required(),
			emp_pass: Joi.string().min(6).required(),
			emp_mobile: Joi.string().min(10).required(),
			emp_country: Joi.string().min(2).required(),
			emp_state: Joi.string().required(),
			emp_city: Joi.string().required(),
			Filename: Joi.string().required(),
			agreechk: Joi.boolean().required()
		});
		return BaseValidation.validateSeekerRegisterBody(req, res, next, seeker_schema);
	};
	seekerVerify(req,res, next){
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required(),
			email_otp: Joi.number().min(6).required(),
			mobile_otp: Joi.number().min(6).required()
		});
		return BaseValidation.validateSeekerVerifyBody(req, res, next, seeker_schema);
	}

	seekerRegEducation(req, res, next) {
		const seeker_schema = Joi.object({
			high_qualif: Joi.number().min(2).required(),
			high_course: Joi.number().min(2).required(),
			high_special: Joi.number().min(2).required(),
			high_college: Joi.number().min(2).required(),
			colg_name: Joi.string().min(2).required(),
			course_type: Joi.string().required(),
			high_pass_yr: Joi.string().required(),
			exp_type: Joi.string().required()
		});
		return BaseValidation.validateSeekerRegEduBody(req, res, next, seeker_schema);
	};

	seekerLogin(req,res,next){
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required(),
			emp_pass: Joi.string().min(6).required()
		});
		return BaseValidation.validateSeekerLoginBody(req, res, next, seeker_schema);
	}
}

module.exports = new SeekerValidation();


