'use strict'

const { employerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class EmployerController { };
EmployerController.dashboard = async (req, res) => {
   try {
      let data = req.valid_user
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}

EmployerController.emp_change_Password = async (req, res) => {
   try {
      const changed_Password = await crudService.updateEmp_byId(req.employer_id, { comp_pass : req.body.new_pass})
      if (changed_Password == 1) {
         logger.info(loggerMessage.changedPassword)
         return response.success(req, res, statusCodes.HTTP_OK, req.valid_user.email, responseMessage.changedPassword)
      } else if (changed_Password == 2) {
         logger.error(loggerMessage.alreadyExited)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.valid_user.email, responseMessage.alreadyExited)
      } else {
         logger.error(loggerMessage.notchangedPass)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.valid_user.email, responseMessage.notchangedPass)
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.employer_id, responseMessage.errorInUpdating)
   }
}

EmployerController.post_job = async (req, res) => {
   try {  
      console.log("employer_id : ", req.employer_id);
      const data = await employerService.postJob(req, 'UnrestJobPost')
      if (Object.keys(data).length == 1 && Object.keys(data)[0] == 'unrst_jid') {
         logger.info(loggerMessage.alreadyExitedJob);
         return response.success(req, res, statusCodes.HTTP_ALREADY_REPORTED, data, responseMessage.alreadyExitedJob);
      } else {
         logger.warn(loggerMessage.jobPosted);
         return response.errors(req, res, statusCodes.HTTP_OK, data, responseMessage.jobPosted);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate)
   }
}

module.exports = EmployerController