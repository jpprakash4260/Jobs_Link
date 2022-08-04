'use strict'
const { adminService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const moment = require('moment')

class AdminController { }
AdminController.createAdmin = async (req, res) => {
   try {
      const created = await adminService.createAdmin(req)
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

AdminController.findAllandCount = async (req, res) => {
   try {
      const founded = await adminService.findAllAndCount()
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

AdminController.findOne = async (req, res) => {
   try {
      let obj = {
         admin_name: req.body.admin_name,
         admin_pass: req.body.admin_pass,
         admin_status: req.body.admin_status,
         sitename: req.body.sitename,
         set_url: req.body.set_url
      }
      const foundOne = await adminService.findOne(obj)
      if (foundOne) {
         logger.info(loggerMessage.getDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, foundOne, responseMessage.getDataSuccess)
      } else {
         logger.info(loggerMessage.getDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, foundOne, responseMessage.getDataFailure)
      }
   } catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInFindOne)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindOne)
   }
}

AdminController.findByPk = async (req, res) => {
   try {
      console.log(req.params.id);
      const findByPk = await adminService.findByPk(req.params.id)
      if (findByPk) {
         logger.info(loggerMessage.getDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, findByPk, responseMessage.getDataSuccess)
      } else {
         logger.info(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, findByPk, responseMessage.notFound)
      }
   } catch (error) {
      logger.error(loggerMessage.errorInFindOne)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindOne)
   }
}

AdminController.updateById = async (req, res) => {
   try {
      const updateById = await adminService.updateById(req.params.id, req.body)
      if (updateById == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, updateById, responseMessage.updateDataSuccess)
      } else if (updateById == 2) {
         logger.info(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, updateById, responseMessage.alreadyExited)
      } else {
         logger.info(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, updateById, responseMessage.updateDataFailure)
      }
   } catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInUpdating)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInUpdating)
   }
}

AdminController.updateStatus = async (req, res) => {
   try {
      var obj = {
         admin_status: req.body.admin_status
      }
      const updateStatus = await adminService.updateStatus(req.body.admin_id, obj)
      if (updateStatus == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, updateStatus, responseMessage.updateDataSuccess)
      } else if (updateStatus == 'Exited Values') {
         logger.info(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, updateStatus, responseMessage.alreadyExited)
      } else {
         logger.info(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, updateStatus, responseMessage.updateDataFailure)
      }
   } catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInUpdating)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInUpdating)
   }
}

AdminController.delete = async (req, res) => {
   try {
      const deleted = await adminService.delete(req.params.id)
      if (deleted) {
         logger.info(loggerMessage.deletedData)
         return response.success(req, res, statusCodes.HTTP_OK, deleted, responseMessage.deletedData)
      } else {
         logger.info(loggerMessage.deleteDataFailure)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, deleted, responseMessage.notDeleted)
      }
   } catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInDeleting)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInDeleting)
   }
}

module.exports = AdminController