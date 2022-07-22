'use strict'
const response = require("../middleware/responses");
const { statusCodes, responseMessage } = require('../constants');

class BaseValidation {
	validateSeekerRegisterBody(req, res, next, seeker_schema){
		try {
			const { error } = seeker_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateSeekerVerifyBody(req, res, next, seeker_schema) {
		try {
			const { error } = seeker_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateSeekerLoginBody(req, res, next, seeker_schema) {
		try {
			const { error } = seeker_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateEmployeeRegisterBody(req, res, next, employer_schema) {
		try {
			const { error } = employer_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateEmployeeVerifyBody(req, res, next, employer_schema) {
		try {
			const { error } = employer_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateEmployeeLoginBody(req, res, next, employer_schema) {
		try {
			const { error } = employer_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateForgotPasswordBody(req, res, next, employer_schema) {
		try {
			const { error } = employer_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
	validateChangePasswordBody(req, res, next, employer_schema) {
		try {
			const { error } = employer_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};
}

module.exports = new BaseValidation();