'use strict'

const { notificationService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class NotificationController { }

NotificationController.create = async (req, res) => {

   try {

      let obj = {
         noti_title: req.body.noti_title,
         noti_msg: req.body.noti_msg,
         chat_id: req.body.chat_id,
         noti_type: req.body.noti_type,
         job_applyid: req.body.job_applyid,
         noti_from: req.body.noti_from,
         noti_ftype: req.body.noti_ftype,
         noti_to: req.body.noti_to,
         noti_date: req.body.noti_date,
         noti_status: req.body.noti_status,
         noti_read: req.body.noti_read
      }

      const created = await notificationService.create(obj)
      const founded = await notificationService.findByPk(created.notify_id)

      if (created && (typeof created) == 'object') {
         logger.error(loggerMessage.createdSuccess)
         return response.success(req, res, statusCodes.HTTP_CREATED, founded, responseMessage.createdSuccess)
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

NotificationController.get = async (req, res) => {

   try {
      let { notify_id } = req.query
      if (!notify_id) throw createError.BadRequest()

      const { rows, count } = await notificationService.findAllAndCount(notify_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

NotificationController.getByPk = async (req, res) => {

   try {
      let { notify_id } = req.params
      if (!notify_id) throw createError.BadRequest()

      const founded = await notificationService.findByPk(notify_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

NotificationController.getCollegeDetails = async (req, res) => {

   try {

      const { notify_id, noti_type, noti_status } = req.body
      if (!notify_id || !noti_type || !noti_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await notificationService.getCollegeDetails(notify_id, noti_status, _start, _limit)
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

NotificationController.update = async (req, res) => {

   try {

      let { notify_id } = req.params
      if (!notify_id) throw createError.BadRequest()

      let obj = {
         noti_title: req.body.noti_title,
         noti_msg: req.body.noti_msg,
         chat_id: req.body.chat_id,
         noti_type: req.body.noti_type,
         job_applyid: req.body.job_applyid,
         noti_from: req.body.noti_from,
         noti_ftype: req.body.noti_ftype,
         noti_to: req.body.noti_to,
         noti_date: req.body.noti_date,
         noti_status: req.body.noti_status,
         noti_read: req.body.noti_read
      }

      const founded = await notificationService.findByPk(notify_id)
      if (!founded) throw createError.NotFound()

      const update = await notificationService.update(founded.notify_id, obj)

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
         console.log(update);
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

NotificationController.delete = async (req, res) => {

   try {

      let { notify_id } = req.query
      if (!notify_id) throw createError.BadRequest()

      const deleted = await notificationService.delete(notify_id)

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

module.exports = NotificationController
