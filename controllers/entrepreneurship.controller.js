'use strict'

const { entrepreneurshipService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class EntrepreneurshipController { }

EntrepreneurshipController.create = async (req, res) => {

   try {

      let obj = {
         ent_title: req.body.ent_title,
         cond_by: req.body.cond_by,
         start_date: req.body.start_date,
         ending_date: req.body.ending_date,
         ent_venue: req.body.ent_venue,
         ent_eligible: req.body.ent_eligible,
         ent_email: req.body.ent_email,
         ent_phone: req.body.ent_phone,
         ent_desc: req.body.ent_desc,
         notif_link: req.body.notif_link,
         reg_date: req.body.reg_date,
         close_date: req.body.close_date,
         ent_status: req.body.ent_status,
         added_date: new Date(req.body.added_date)
      }

      const created = await entrepreneurshipService.create(obj)
      const founded = await entrepreneurshipService.findByPk(created.ent_id)

      if (created) {
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

EntrepreneurshipController.get = async (req, res) => {

   try {
      let { ent_id } = req.query
      if (!ent_id) throw createError.BadRequest()

      const { rows, count } = await entrepreneurshipService.findAllAndCount(ent_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EntrepreneurshipController.getByPk = async (req, res) => {

   try {
      let { ent_id } = req.params
      if (!ent_id) throw createError.BadRequest()

      const founded = await entrepreneurshipService.findByPk(ent_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EntrepreneurshipController.getCollegeDetails = async (req, res) => {

   try {

      const { ent_id, ent_title, ent_status } = req.body
      if (!ent_id || !ent_title || !ent_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await entrepreneurshipService.getCollegeDetails(ent_id, ent_status, _start, _limit)
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

EntrepreneurshipController.update = async (req, res) => {

   try {

      let { ent_id } = req.params
      if (!ent_id) throw createError.BadRequest()

      let obj = {
         ent_title: req.body.ent_title,
         cond_by: req.body.cond_by,
         start_date: req.body.start_date,
         ending_date: req.body.ending_date,
         ent_venue: req.body.ent_venue,
         ent_eligible: req.body.ent_eligible,
         ent_email: req.body.ent_email,
         ent_phone: req.body.ent_phone,
         ent_desc: req.body.ent_desc,
         notif_link: req.body.notif_link,
         reg_date: req.body.reg_date,
         close_date: req.body.close_date,
         ent_status: req.body.ent_status,
         added_date: new Date(req.body.added_date)
      }

      const founded = await entrepreneurshipService.findByPk(ent_id)


      const update = await entrepreneurshipService.update(founded.ent_id, obj)

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

EntrepreneurshipController.delete = async (req, res) => {

   try {

      let { ent_id } = req.query
      if (!ent_id) throw createError.BadRequest()

      const deleted = await entrepreneurshipService.delete(ent_id)

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

module.exports = EntrepreneurshipController
