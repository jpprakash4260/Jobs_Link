const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation");

class SeekerValidation {
	seekerRegister(req, res, next){
		const seeker_schema = Joi.object({
			seeker_name: Joi.string().min(5).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(4).required(),
			mobile: Joi.string().min(10).required(),
			country: Joi.string().min(2).required(),
			state: Joi.string().required(),
			city: Joi.string().required(),
			resume: Joi.string().required()
		});
		return BaseValidation.validateSeekerRegisterBody(req, res, next, seeker_schema);
	};
	seekerVerify(req,res, next){
		const seeker_schema = Joi.object({
			email: Joi.string().email().required(),
			OTP: Joi.number().min(4).required()
		});
		return BaseValidation.validateSeekerVerifyBody(req, res, next, seeker_schema);
	}
	seekerLogin(req,res,next){
		const seeker_schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(4).required()
		});
		return BaseValidation.validateSeekerLoginBody(req, res, next, seeker_schema);
	}
}



module.exports = new SeekerValidation();


