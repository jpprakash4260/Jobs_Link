'use strict'
const response = require("../middleware/responses");
const { statusCodes, responseMessage } = require('../constants');

class BaseValidation {
	validateSeekerRegisterBody(req, res, next, seeker_schema) {
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
	validateSeekerRegEduBody(req, res, next, seeker_schema) {
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

	validatePersonalDetails(req, res, next, seeker_schema) {
		try {
			const { error } = seeker_schema.validate(req.body);
			if (error) return response.joierrors(req, res, error);
			next();
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest);
		}
	};

	validateResumeHeadlines(req, res, next, seeker_schema) {
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

	AccessBody(req, res, next, access_schema) {
		try {
			const { error } = access_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	AdminBody(req, res, next, admin_schema) {
		try {
			const { error } = admin_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	AdminMenuBody(req, res, next, adminMenu_schema) {
		try {
			const { error } = adminMenu_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CampusBody(req, res, next, campus_schema) {
		try {
			const { error } = campus_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	ChatBody(req, res, next, chat_schema) {
		try {
			const { error } = chat_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CityBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, college_schema) {
		try {
			const { error } = college_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	ConferenceBody(req, res, next, conference_schema) {
		try {
			const { error } = conference_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	ContactResumeBody(req, res, next, contactresume_schema) {
		try {
			const { error } = contactresume_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CountryBody(req, res, next, country_schema) {
		try {
			const { error } = country_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	Edu_CourseBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}


	EmpEduDetailBody(req, res, next, empedudetail_schema) {
		try {
			const { error } = empedudetail_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	Empjobcat(req, res, next, empjobcat_schema) {
		try {
			const { error } = empjobcat_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}

	CollegeBody(req, res, next, edu_course_schema) {
		try {
			const { error } = edu_course_schema.validate(req.body)
			if (error) return response.joierrors(req, res, error)
			next()
		} catch (error) {
			response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.badRequest)
		}
	}


}

module.exports = new BaseValidation();