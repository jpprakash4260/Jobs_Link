'use strict'

const { employerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
// const { loginFailure } = require('../constants/responseMessage');

class EmployerController { };
EmployerController.dashboard = async (req, res) => {
   try {
      let data = req.validated_user
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}

EmployerController.change_Password = async (req, res) => {
   try {
      let recut_id = req.validated_user_id
      const key = 'comp_pass'
      const value = req.body.new_pass
      const changed_Password = await crudService.updateEmp_byId(recut_id, key, value)
      if (changed_Password == 1) {
         logger.info(loggerMessage.changedPassword)
         return response.success(req, res, statusCodes.HTTP_OK, req.validated_user.email, responseMessage.changedPassword)
      } else if (changed_Password == 2) {
         logger.error(loggerMessage.alreadyExited)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user.email, responseMessage.alreadyExited)
      } else {
         logger.error(loggerMessage.notchangedPass)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user.email, responseMessage.notchangedPass)
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user, responseMessage.errorInUpdating)
   }
}

EmployerController.post_job = async (req, res) => {
   try {
      let crnt_email = req.validated_user
      const obj = { emp_email : crnt_email.email}
      const crnt_user_id = await crudService.findOne(obj, 'Employee'); 
      console.log("crnt_user_id : ", crnt_user_id.emp_id);
      const data = await employerService.postJob(req, 'UnrestJobPostExp')
      if (Object.keys(data).length < 2 && Object.keys(data)[0] == 'unrst_jid') {
         logger.info(loggerMessage.alreadyExitedJob);
         return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.alreadyExitedJob);
      } else {
         logger.warn(loggerMessage.jobPosted);
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, data, responseMessage.jobPosted);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate)
   }
}

module.exports = EmployerController