const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation");

class SeekerValidation {
	create(req, res, next) {
		const college_schema = Joi.object({
			colg_name: Joi.string().min(1).required(),
			colg_slug: Joi.string().min(1).required(),
			colg_pos: Joi.number().min(1).required(),
			colg_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
			colg_date: Joi.date()
		})

		return BaseValidation.CollegeBody(req, res, next, college_schema)
	}

	update(req, res, next) {
		const college_schema = Joi.object({
			colg_name: Joi.string().min(1),
			colg_slug: Joi.string().min(1),
			colg_pos: Joi.number().min(1),
			colg_status: Joi.string().valid('Y', 'N', 'D').max(1),
			colg_date: Joi.date()
		})

		return BaseValidation.CollegeBody(req, res, next, college_schema)
	}

	seekerRegister(req, res, next) {
		const seeker_schema = Joi.object({
			emp_name: Joi.string().min(5).required(),
			emp_email: Joi.string().email().required(),
			emp_pass: Joi.string().min(6).required(),
			emp_mobile: Joi.string().min(10).required(),
			emp_country: Joi.string().min(2).required(),
			emp_state: Joi.string().required(),
			emp_city: Joi.string().required(),
			agreechk: Joi.boolean().required()
		});
		return BaseValidation.validateSeekerRegisterBody(req, res, next, seeker_schema);
	};
	seekerVerifyEmail(req, res, next) {
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required(),
			email_otp: Joi.number().min(6).required()
		});
		return BaseValidation.validateSeekerVerifyBody(req, res, next, seeker_schema);
	}

	seekerVerifyMobile(req, res, next) {
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required(),
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

	seekerLogin(req, res, next) {
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required(),
			emp_pass: Joi.string().min(6).required()
		});
		return BaseValidation.validateSeekerLoginBody(req, res, next, seeker_schema);
	}

	seekerforgotPassword(req, res, next) {
		const seeker_schema = Joi.object({
			emp_email: Joi.string().email().required()
		});
		return BaseValidation.validateSeekerLoginBody(req, res, next, seeker_schema);
	}

	seekerPersonalDetails(req, res, next) {
		const seeker_schema = Joi.object({
			emp_dob: Joi.date().required(),
			emp_gender: Joi.string().min(4).required(),
			emp_address: Joi.string().required(),
			emp_pincode: Joi.string().required(),
			emp_marital: Joi.string().required()
		})
		return BaseValidation.validatePersonalDetails(req, res, next, seeker_schema)
	}

	seekerResumeHeadlines(req, res, next) {
		const seeker_schema = Joi.object({
			emp_resumeheadline: Joi.string().required()
		})
		return BaseValidation.validateResumeHeadlines(req, res, next, seeker_schema)
	}

	seekerKeySkills(req, res, next) {
		const seeker_schema = Joi.object({
			keysk_name: Joi.string().required()
		})
		return BaseValidation.validateResumeHeadlines(req, res, next, seeker_schema)
	}

	seekerCreateEmployement(req, res, next) {
		const seeker_schema = Joi.object({
			emp_desig: Joi.string().required(),
			emp_org: Joi.string().required(),
			cur_comp: Joi.string().required(),
			exp_yr: Joi.string().required(),
			exp_month: Joi.string().required(),
			exp_yr_to: Joi.string().required(),
			exp_month_to: Joi.string().required(),
			emp_detail: Joi.string().required()
		})
		return BaseValidation.validateResumeHeadlines(req, res, next, seeker_schema)
	}

	seekerUpdateEmployement(req, res, next) {
		const seeker_schema = Joi.object({
			emp_desig: Joi.string(),
			emp_org: Joi.string(),
			cur_comp: Joi.string(),
			exp_yr: Joi.string(),
			exp_month: Joi.string(),
			exp_yr_to: Joi.string(),
			exp_month_to: Joi.string(),
			emp_detail: Joi.string()
		})
		return BaseValidation.validateResumeHeadlines(req, res, next, seeker_schema)
	}
}

module.exports = new SeekerValidation();

