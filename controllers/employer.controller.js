'use strict'

const { employerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

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

EmployerController.change_Password = async (req, res) =>{
   try {
      let recut_id = req.validated_user_id
      const key = 'comp_pass'
      const value = req.body.new_pass
      const changed_Password = await crudService.updateEmp_byId(recut_id, key, value)
      if(changed_Password == 1){
         logger.info(loggerMessage.changedPassword)
         return response.success(req,res, statusCodes.HTTP_OK, req.validated_user.email, responseMessage.changedPassword)
      } else if(changed_Password == 2){
         logger.error(loggerMessage.alreadyExited)
         return response.errors( req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user.email, responseMessage.alreadyExited)
      }else{
         logger.error(loggerMessage.notchangedPass)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user.email, responseMessage.notchangedPass)
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.validated_user, responseMessage.errorInUpdating)
   }
}

module.exports = EmployerController