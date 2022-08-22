'use strict'
const jwt = require('jsonwebtoken');

const response = require("./responses");
const { seekerService } = require("../services")
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
const createError = require('http-errors')

class BaseValidation {
	validateToken(req, res, next) {
		try {
			let token = req.headers["authorization"]

			if (!token || (token && !token.startsWith("Bearer "))) {
				logger.error(loggerMessage.unauthorized)
				return response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized)
			}

			token = token.slice(7, token.length)
			jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {

				if (error) {
					logger.error(loggerMessage.unauthorized)
					response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, error, responseMessage.unauthorized)
				}
				else {

					if (decoded) {

						req.valid_user = decoded.email
						logger.info(loggerMessage.tokenVerifed)

						const seeker = await seekerService.findByEmail(decoded.email)

						if (!seeker) {
							logger.error(loggerMessage.seekerNotFound)
							return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, seeker, responseMessage.seekerNotFound)
						}

						req.seeker_id = seeker.emp_id
						logger.info(loggerMessage.seekerVerified)
						next()

					}
					else {
						return response(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, decoded, responseMessage.invalidToken)
					}
				}
			})
		} catch (error) {
			logger.error(loggerMessage.unauthorized);
			response.errors(req, res, statusCodes.HTTP_UNAUTHORIZED, responseMessage.unauthorized);
		}
	};
}

module.exports = new BaseValidation();