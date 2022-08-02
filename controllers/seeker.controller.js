'use strict'

const { seekerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class SeekerController { };
SeekerController.dashboard = async (req, res) => {
   try {
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, req.valid_user, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}
SeekerController.search = async (req, res) => {
   try {
      const search = await crudService.search(req, 'Employee')
      search ? search : search = ''
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, search, responseMessage.getDataSuccess);
   } catch (err) {
      return err
   }
}

SeekerController.updatePersonal = async (req, res) => {
   try{
      const updated = await crudService.updateSeeker_byId(req.seeker_id, req.body)
      if (updated == 1) {
         logger.info(loggerMessage.updateDataSuccess);
         return response.success(req, res, statusCodes.HTTP_OK, updated, responseMessage.seekerUpdated);
      } else if(updated == 2){
         logger.warn(loggerMessage.alreadyExited);
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, updated, responseMessage.alreadyExited);
      }
      else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, updated, responseMessage.seekerNotUpdated);
      }
   }catch(err){
      logger.error(loggerMessage.errorInUpdating);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

module.exports = SeekerController