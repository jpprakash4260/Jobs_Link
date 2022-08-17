'use strict'

const { campusService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class CampusController { }

CampusController.create = async (req, res) => {

   try {

      let obj = {
         notify: req.body.notify,
         camp_title: req.body.camp_title,
         camp_date: req.body.camp_date,
         camp_org: req.body.camp_org,
         camp_venue: req.body.camp_venue,
         camp_logo: req.body.camp_logo,
         camp_qualif: req.body.camp_qualif,
         camp_exp: req.body.camp_exp,
         notif_link: req.body.notif_link,
         camp_status: req.body.camp_status,
         added_date: req.body.added_date,
         lastupdate: new Date()
      }

      const created = await campusService.create(obj)

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

CampusController.get = async (req, res) => {

   try {
      let { camp_id } = req.query
      if (!camp_id) throw createError.BadRequest()

      const { rows, count } = await campusService.findAllAndCount(camp_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

CampusController.getByPk = async (req, res) => {

   try {
      let { camp_id } = req.params
      if (!camp_id) throw createError.BadRequest()

      const founded = await campusService.findByPk(camp_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

CampusController.getAdminDetails = async (req, res) => {

   try {

      const { camp_id, camp_title, camp_status } = req.body
      if (!camp_id || !camp_title || !camp_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['camp_title'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await campusService.getCampusDetails(camp_id, camp_status, _start, _limit)
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

CampusController.update = async (req, res) => {

   try {

      let { camp_id } = req.params
      if (!camp_id) throw createError.BadRequest()

      let obj = {
         notify: req.body.notify,
         camp_title: req.body.camp_title,
         camp_date: req.body.camp_date,
         camp_org: req.body.camp_org,
         camp_venue: req.body.camp_venue,
         camp_logo: req.body.camp_logo,
         camp_qualif: req.body.camp_qualif,
         camp_exp: req.body.camp_exp,
         notif_link: req.body.notif_link,
         camp_status: req.body.camp_status,
         added_date: new Date(req.body.added_date)
      }

      const update = await campusService.update(camp_id, obj)
      const founded = await campusService.findByPk(camp_id)

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

CampusController.delete = async (req, res) => {

   try {

      let { camp_id } = req.query
      if (!camp_id) throw createError.BadRequest()

      const deleted = await campusService.delete(camp_id)

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

module.exports = CampusController
