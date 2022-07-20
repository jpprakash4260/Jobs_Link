'use strict'

const { seekerService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class SeekerController{ };
SeekerController.dashboard = async (req, res) => {
   try {
      let data = req.seeker_validate
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}

module.exports = SeekerController