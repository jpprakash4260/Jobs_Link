'use strict'

const { adminService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const moment = require('moment')
const createError = require('http-errors')

class AdminController { }

AdminController.create = async (req, res) => {

   try {

      let obj = {
         admin_name: req.body.admin_name,
         admin_pass: req.body.admin_pass,
         admin_status: req.body.admin_status,
         sitename: req.body.sitename,
         set_url: req.body.set_url,
         setting_fields: req.body.setting_fields,
         setting_operator: req.body.setting_operator,
         setting_logo: req.body.setting_logo,
         setting_banner: req.body.setting_banner,
         type: req.body.type,
         explanation: req.body.explanation,
         lastupdate: ''
      }

      const created = await adminService.create(obj)

      if (created && (typeof created) == 'object') {
         logger.error(loggerMessage.createdSuccess)
         return response.success(req, res, statusCodes.HTTP_CREATED, created, responseMessage.createdSuccess)
      }
      else {
         logger.error(loggerMessage.notCreated)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, created, responseMessage.notCreated)
      }
   }
   catch (error) {
      logger.error(loggerMessage.errInCreate)
      return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, error, responseMessage.errInCreate)
   }
}

AdminController.get = async (req, res) => {

   try {
      let { access_id } = req.query
      if (!access_id) throw createError.BadRequest()

      const { rows, count } = await adminService.findAllAndCount(access_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, rows, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminController.getByPk = async (req, res) => {

   try {
      let { access_id } = req.params
      if (!access_id) throw createError.BadRequest()

      const founded = await adminService.findByPk(access_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminController.getAdminDetails = async (req, res) => {

   try {

      const { admin_id, admin_name, admin_status } = req.body;
      if (!admin_id || !admin_name || !admin_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0;
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10;
      let search = req.body && req.body.search ? req.body.search : '';

      if (search) {
         where['admin_name'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await adminService.getAdminDetails(admin_id, _start, _limit)
      if (totalAccess == null) throw createError.NotFound('total not found !!')

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, totalAccess, responseMessage.getDataSuccess)
   }
   catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminController.update = async (req, res) => {

   try {

      let { admin_id } = req.params
      console.log(admin_id)
      if (!admin_id) throw createError.BadRequest()

      let obj = {
         admin_name: req.body.admin_name,
         admin_pass: req.body.admin_pass,
         admin_status: req.body.admin_status,
         sitename: req.body.sitename,
         set_url: req.body.set_url,
         setting_fields: req.body.setting_fields,
         setting_operator: req.body.setting_operator,
         setting_logo: req.body.setting_logo,
         setting_banner: req.body.setting_banner,
         type: req.body.type,
         explanation: req.body.explanation
      }

      const update = await adminService.update(admin_id, obj)

      if (update == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, obj, responseMessage.updateDataSuccess)
      }
      else if (update == 'Exited Values') {
         logger.warn(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_ALREADY_REPORTED, update, responseMessage.alreadyExited)
      }
      else if (update == 'Access Not Found') {
         logger.error(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, update, responseMessage.notFound)
      }
      else if (update == 0) {
         logger.error(loggerMessage.notUpdated)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, update, responseMessage.notUpdated)
      }
      else {
         logger.error(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_EXPECTATION_FAILED, update, responseMessage.updateDataFailure)
      }
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInUpdating)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInUpdating)
   }
}

AdminController.delete = async (req, res) => {

   try {

      let { admin_id } = req.query
      if (!admin_id) throw createError.BadRequest()

      const deleted = await adminService.delete(admin_id)

      if (deleted == 1) {
         logger.error(loggerMessage.deleteDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, deleted, responseMessage.deletedData)
      }
      else if (deleted == 'Access not found') {
         logger.error(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, deleted, responseMessage.notFound)
      }
      else {
         logger.error(loggerMessage.notDeleted)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, deleted, responseMessage.notDeleted)
      }
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInDeleting)
      return response.success(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInDeleting)
   }
}

module.exports = AdminController
