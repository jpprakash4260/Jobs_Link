'use strict'

const { edu_courseService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class Edu_CourseController { }

Edu_CourseController.create = async (req, res) => {

   try {

      let obj = {
         pid: req.body.pid,
         ecatid_sub: req.body.ecatid_sub,
         ecat_type: req.body.ecat_type,
         ecat_name: req.body.ecat_name,
         ecat_slug: req.body.ecat_slug,
         ecat_pos: req.body.ecat_pos,
         ecat_status: req.body.ecat_status,
         ecat_dt: new Date(req.body.ecat_dt)
      }

      const created = await edu_courseService.create(obj)

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

Edu_CourseController.get = async (req, res) => {

   try {
      let { ecat_id } = req.query
      if (!ecat_id) throw createError.BadRequest()

      const { rows, count } = await edu_courseService.findAllAndCount(ecat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

Edu_CourseController.getByPk = async (req, res) => {

   try {
      let { ecat_id } = req.params
      if (!ecat_id) throw createError.BadRequest()

      const founded = await edu_courseService.findByPk(ecat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

Edu_CourseController.getCollegeDetails = async (req, res) => {

   try {

      const { ecat_id, ecat_name, ecat_status } = req.body
      if (!ecat_id || !ecat_name || !ecat_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await edu_courseService.getCollegeDetails(ecat_id, ecat_status, _start, _limit)
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

Edu_CourseController.update = async (req, res) => {

   try {

      let { ecat_id } = req.params
      if (!ecat_id) throw createError.BadRequest()

      let obj = {
         pid: req.body.pid,
         ecatid_sub: req.body.ecatid_sub,
         ecat_type: req.body.ecat_type,
         ecat_name: req.body.ecat_name,
         ecat_slug: req.body.ecat_slug,
         ecat_pos: req.body.ecat_pos,
         ecat_status: req.body.ecat_status,
         ecat_dt: new Date(req.body.ecat_dt)
      }

      const founded = await edu_courseService.findByPk(ecat_id)
      const update = await edu_courseService.update(founded.ecat_id, obj)

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

Edu_CourseController.delete = async (req, res) => {

   try {

      let { ecat_id } = req.query
      if (!ecat_id) throw createError.BadRequest()

      const deleted = await edu_courseService.delete(ecat_id)

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

module.exports = Edu_CourseController
