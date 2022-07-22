'use strict'
const jwt = require('jsonwebtoken');

const response = require("./responses");
const { loginRegisterService } = require("../services")
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
					let { key1, value1, key2, value2 } = ''
					req.validated_user = decoded;
					key1 = 'mail_id'; value1 = decoded.email; key2 = 'email_verify'; value2 = 'Y';
					const ext_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);
					if(ext_email){
						req.validated_user_id = ext_email.recut_id
					}
					logger.info(loggerMessage.tokenVerifed);
					next();
				}
			});
		} catch (error) {
			logger.error(loggerMessage.unauthorized);
			response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		}
	};
}

module.exports = new BaseValidation();