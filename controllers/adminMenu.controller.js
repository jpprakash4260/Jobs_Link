'use strict'

const { adminMenuService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class AdminMenuController { }

AdminMenuController.create = async (req, res) => {

   try {

      let obj = {
         menu_title: req.body.menu_title,
         menu_type: req.body.menu_type,
         pid: req.body.pid,
         menu_link: req.body.menu_link,
         menu_icon: req.body.menu_icon,
         menu_home: req.body.menu_home,
         menu_pos: req.body.menu_pos,
         menu_status: req.body.menu_status
      }

      const created = await adminMenuService.create(obj)

      if (created) {
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

AdminMenuController.get = async (req, res) => {

   try {
      let { menu_id } = req.query
      if (!menu_id) throw createError.BadRequest()

      const { rows, count } = await adminMenuService.findAllAndCount(menu_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminMenuController.getByPk = async (req, res) => {

   try {
      let { menu_id } = req.params
      if (!menu_id) throw createError.BadRequest()

      const founded = await adminMenuService.findByPk(menu_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminMenuController.getAdminDetails = async (req, res) => {

   try {

      const { menu_id, menu_home, menu_status } = req.body
      if (!menu_id || !menu_home || !menu_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['menu_title'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await adminMenuService.getAdminDetails(menu_id, _start, _limit)
      console.log(totalAccess);
      if (totalAccess == null) throw createError.NotFound('total not found !!')

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, totalAccess, totalAccess == 0 ? responseMessage.notFound : responseMessage.getDataSuccess)
   }
   catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AdminMenuController.update = async (req, res) => {

   try {

      let { menu_id } = req.params
      if (!menu_id) throw createError.BadRequest()

      let obj = {
         menu_title: req.body.menu_title,
         menu_type: req.body.menu_type,
         pid: req.body.pid,
         menu_link: req.body.menu_link,
         menu_icon: req.body.menu_icon,
         menu_home: req.body.menu_home,
         menu_pos: req.body.menu_pos,
         menu_status: req.body.menu_status
      }

      const update = await adminMenuService.update(menu_id, obj)
      const founded = await adminMenuService.findByPk(menu_id)

      if (update == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, founded, responseMessage.updateDataSuccess)
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

AdminMenuController.delete = async (req, res) => {

   try {

      let { menu_id } = req.query
      if (!menu_id) throw createError.BadRequest()

      const deleted = await adminMenuService.delete(menu_id)

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

module.exports = AdminMenuController
