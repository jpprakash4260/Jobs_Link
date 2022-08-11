'use strict'

const { chatService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const moment = require('moment')
const createError = require('http-errors')

class ChatController { }

ChatController.create = async (req, res) => {

   try {

      let obj = {
         job_id: req.body.job_id,
         applyid: req.body.applyid,
         chat_from: req.body.chat_from,
         chat_fname: req.body.chat_fname,
         chat_ftype: req.body.chat_ftype,
         chat_to: req.body.chat_to,
         chat_tname: req.body.chat_tname,
         chat_ttype: req.body.chat_ttype,
         chat_msg: req.body.chat_msg,
         chat_status: req.body.chat_status,
         chat_date: req.body.chat_date,
         read_status: req.body.read_status,
         read_date: req.body.read_date,
         ipaddr: req.body.ipaddr,
         lastupdate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      }

      const created = await chatService.create(obj)

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

ChatController.get = async (req, res) => {

   try {
      let { chat_id } = req.query
      if (!chat_id) throw createError.BadRequest()

      const { rows, count } = await chatService.findAllAndCount(chat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

ChatController.getByPk = async (req, res) => {

   try {
      let { chat_id } = req.params
      if (!chat_id) throw createError.BadRequest()

      const founded = await chatService.findByPk(chat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

ChatController.getAdminDetails = async (req, res) => {

   try {

      const { chat_id, chat_fname, job_id, chat_status } = req.body
      if (!chat_fname || !job_id || !chat_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await chatService.getCampusDetails(chat_id, chat_status, _start, _limit)
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

ChatController.update = async (req, res) => {

   try {

      let { chat_id } = req.params
      if (!chat_id) throw createError.BadRequest()

      let obj = {
         job_id: req.body.job_id,
         applyid: req.body.applyid,
         chat_from: req.body.chat_from,
         chat_fname: req.body.chat_fname,
         chat_ftype: req.body.chat_ftype,
         chat_to: req.body.chat_to,
         chat_tname: req.body.chat_tname,
         chat_ttype: req.body.chat_ttype,
         chat_msg: req.body.chat_msg,
         chat_status: req.body.chat_status,
         chat_date: new Date(req.body.chat_date),
         read_status: req.body.read_status,
         read_date: new Date(req.body.read_date),
         ipaddr: req.body.ipaddr,
      }

      const update = await chatService.update(chat_id, obj)

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

ChatController.delete = async (req, res) => {

   try {

      let { chat_id } = req.query
      if (!chat_id) throw createError.BadRequest()

      const deleted = await chatService.delete(chat_id)

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

module.exports = ChatController
