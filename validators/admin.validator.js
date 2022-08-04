const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class AdminValidation {
   employerRegister(req, res, next) {
      const admin_schema = Joi.object({
         
      })
      return BaseValidation.validateAdminBody(req, res, next, admin_schema)
   }
}

module.exports = new AdminValidation();
