'use strict'

const { seekerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
const db = require('../Models');

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
   try{
      const search = await crudService.search(req, 'Employee')
      search ? search : search = ''
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, search, responseMessage.getDataSuccess);
   }catch(err){

   }
}

module.exports = SeekerController