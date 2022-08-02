'use strict'
const jwt = require('jsonwebtoken');

const response = require("./responses");
const { crudService } = require("../services")
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class BaseValidation {
	validateToken(req, res, next) {
		try {
			let token = req.headers["authorization"];
			if (!token || (token && !token.startsWith("Bearer "))) {
				logger.error(loggerMessage.unauthorized);
				return response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
			};
			token = token.slice(7, token.length);
			jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
				if (error) {
					logger.error(loggerMessage.unauthorized);
					response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, error, responseMessage.unauthorized);
				} else {
					let obj1 = { emp_email: decoded.email }; const seeker = await crudService.findOne(obj1, 'Employee')
					let obj2 = { mail_id: decoded.email }; const employer = await crudService.findOne(obj2, 'RecutComp')
					req.valid_user = decoded
					if(seeker) req.seeker_id = seeker.emp_id
					else if(employer) req.employer_id = employer.recut_id	
					logger.info(loggerMessage.tokenVerifed)
					next()
				}
			});
		} catch (error) {
			logger.error(loggerMessage.unauthorized);
			response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		}
	};
}

module.exports = new BaseValidation();