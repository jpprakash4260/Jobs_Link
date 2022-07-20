'use strict'

const { employerService } = require('../services');
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

module.exports = EmployerController