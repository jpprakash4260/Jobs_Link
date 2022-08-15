'use strict'

const { conferenceService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class ConferenceController { }

ConferenceController.create = async (req, res) => {

   try {

      let obj = {
         conf_title: req.body.conf_title,
         conf_image: req.body.conf_image,
         notif_link: req.body.notif_link,
         start_date: new Date(req.body.start_date),
         exp_date: new Date(req.body.exp_date),
         end_date: new Date(req.body.end_date),
         dead_line: new Date(req.body.dead_line),
         enq_email: req.body.enq_email,
         conf_venue: req.body.conf_venue,
         conf_status: req.body.conf_status,
         added_date: new Date(req.body.added_date)
      }

      const created = await conferenceService.create(obj);
      const founded = await conferenceService.findByPk(created.conf_id)

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

ConferenceController.get = async (req, res) => {

   try {
      let { conf_id } = req.query
      if (!conf_id) throw createError.BadRequest()

      const { rows, count } = await conferenceService.findAllAndCount(conf_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

ConferenceController.getByPk = async (req, res) => {

   try {
      let { conf_id } = req.params
      if (!conf_id) throw createError.BadRequest()

      const founded = await conferenceService.findByPk(conf_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

ConferenceController.getCollegeDetails = async (req, res) => {

   try {

      const { conf_title, notif_link, conf_status } = req.body
      if (!conf_title || !notif_link || !conf_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await conferenceService.getCollegeDetails(conf_title, conf_status, _start, _limit)
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

ConferenceController.update = async (req, res) => {

   try {

      let { conf_id } = req.params
      if (!conf_id) throw createError.BadRequest()

      let obj = {
         notif_link: req.body.notif_link,
         conf_image: req.body.conf_image,
         notif_link: req.body.notif_link,
         start_date: new Date(req.body.start_date),
         exp_date: new Date(req.body.exp_date),
         end_date: new Date(req.body.end_date),
         dead_line: new Date(req.body.dead_line),
         enq_email: req.body.enq_email,
         conf_venue: req.body.conf_venue,
         conf_status: req.body.conf_status,
         added_date: new Date(req.body.added_date)
      }
      const founded = await conferenceService.findByPk(conf_id)
      if (!founded) throw createError.NotFound()

      const update = await conferenceService.update(founded.conf_id, obj)

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

ConferenceController.delete = async (req, res) => {

   try {

      let { conf_id } = req.query
      if (!conf_id) throw createError.BadRequest()

      const deleted = await conferenceService.delete(conf_id)

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

module.exports = ConferenceController
