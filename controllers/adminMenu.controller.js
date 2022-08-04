'use strict'
const { adminMenuService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const moment = require('moment')

class AdminMenuController { }
AdminMenuController.createAdminMenu = async (req, res) => {
   try {
      const created = await adminMenuService.createAdmin(req)
      if (created) {
         logger.info(loggerMessage.createdSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, created, responseMessage.createdSuccess)
      } else {
         logger.info(loggerMessage.notCreated)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, created, responseMessage.notCreated)
      }
   } catch (error) {
      logger.error(loggerMessage.errInCreate)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errInCreate)
   }
}

AdminMenuController.findAllandCount = async (req, res) => {
   try {
      const founded = await adminMenuService.findAllAndCount()
      if (founded) {
         logger.info(loggerMessage.getDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, founded, responseMessage.getDataSuccess)
      } else {
         logger.info(loggerMessage.getDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, founded, responseMessage.getDataFailure)
      }
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindingAll)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindingAll)
   }
}

AdminMenuController.findOne = async (req, res) => {
   try {
      let obj = {
         menu_title: req.body.menu_title,
         menu_type: req.body.menu_type,
         pid: req.body.pid,
      }
      const foundOne = await adminMenuService.findOne(obj)
      if (foundOne) {
         logger.info(loggerMessage.getDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, foundOne, responseMessage.getDataSuccess)
      } else {
         logger.info(loggerMessage.getDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, foundOne, responseMessage.getDataFailure)
      }
   } catch (error) {
      logger.error(loggerMessage.errorInFindOne)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindOne)
   }
}

AdminMenuController.findByPk = async (req, res) => {
   try {
      const findByPk = await adminMenuService.findByPk(req.params.id)
      if (findByPk) {
         logger.info(loggerMessage.getDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, findByPk, responseMessage.getDataSuccess)
      } else {
         logger.info(loggerMessage.getDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, findByPk, responseMessage.getDataFailure)
      }
   } catch (error) {
      logger.error(loggerMessage.errorInFindOne)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindOne)
   }
}

AdminMenuController.updateById = async (req, res) => {
   try {
      const updateById = await adminMenuService.updateById(req.params.id, req.body)
      if (updateById == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, updateById, responseMessage.updateDataSuccess)
      } else if (updateById == 'Exited Values') {
         logger.info(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_OK, updateById, responseMessage.alreadyExited)
      } else {
         logger.error(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_OK, updateById, responseMessage.updateDataFailure)
      }
   } catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInUpdating)
   }
}

AdminMenuController.updateStatus = async (req, res) => {
   try {
      var obj = {
         menu_icon: req.body.menu_icon
      }
      const updateStatus = await adminMenuService.updateStatus(req.body.menu_id, obj)
      console.log('updateStatus : ', updateStatus)
      if (updateStatus == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, updateStatus, responseMessage.updateDataSuccess)
      }
      else if (updateStatus == 'Exited Values') {
         logger.info(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_NOT_MODIFIED, updateStatus, responseMessage.alreadyExited)
      } 
      else {
         logger.info(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_MODIFIED, updateStatus, responseMessage.updateDataFailure)
      }
   } catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInUpdating)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInUpdating)
   }
}

AdminMenuController.delete = async (req, res) => {
   try {
      const deleted = await adminMenuService.delete(req.params.id)
      if (deleted == 1) {
         logger.info(loggerMessage.deletedData)
         return response.success(req, res, statusCodes.HTTP_OK, deleted, responseMessage.deletedData)
      } else {
         logger.info(loggerMessage.deleteDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, deleted, responseMessage.notDeleted)
      }
   } catch (error) {
      logger.error(loggerMessage.errorInDeleting)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInDeleting)
   }
}

module.exports = AdminMenuController