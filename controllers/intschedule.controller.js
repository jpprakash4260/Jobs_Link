'use strict'

const { intscheduleService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class IntscheduleController { }

IntscheduleController.create = async (req, res) => {

   try {

      let obj = {
         applied_id: req.body.applied_id,
         emp_id: req.body.emp_id,
         company_id: req.body.company_id,
         mail_title: req.body.mail_title,
         mail_content: req.body.mail_content,
         ipaddress: req.body.ipaddress,
         mail_date: new Date(req.body.mail_date)
      }

      const created = await intscheduleService.create(obj)

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

IntscheduleController.get = async (req, res) => {

   try {
      let { intsch_id } = req.query
      if (!intsch_id) throw createError.BadRequest()

      const { rows, count } = await intscheduleService.findAllAndCount(intsch_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

IntscheduleController.getByPk = async (req, res) => {

   try {
      let { intsch_id } = req.params
      if (!intsch_id) throw createError.BadRequest()

      const founded = await intscheduleService.findByPk(intsch_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

IntscheduleController.getCollegeDetails = async (req, res) => {

   try {

      const { intsch_id, mail_title, mail_content } = req.body
      if (!intsch_id || !mail_title || !mail_content) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await intscheduleService.getCollegeDetails(intsch_id, mail_content, _start, _limit)
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

IntscheduleController.update = async (req, res) => {

   try {

      let { intsch_id } = req.params
      if (!intsch_id) throw createError.BadRequest()

      let obj = {
         applied_id: req.body.applied_id,
         emp_id: req.body.emp_id,
         company_id: req.body.company_id,
         mail_title: req.body.mail_title,
         mail_content: req.body.mail_content,
         ipaddress: req.body.ipaddress,
         mail_date: new Date(req.body.mail_date)
      }

      const founded = await intscheduleService.findByPk(intsch_id)


      const update = await intscheduleService.update(founded.intsch_id, obj)

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

IntscheduleController.delete = async (req, res) => {

   try {

      let { intsch_id } = req.query
      if (!intsch_id) throw createError.BadRequest()

      const deleted = await intscheduleService.delete(intsch_id)

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

module.exports = IntscheduleController
