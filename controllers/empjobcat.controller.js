'use strict'

const { empjobcatService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class EmpjobcatController { }

EmpjobcatController.create = async (req, res) => {

   try {

      let obj = {
         emp_id: req.body.emp_id,
         cat_id: req.body.cat_id,
         subcat_id: req.body.subcat_id,
         mjcat_status: req.body.mjcat_status,
         mjcat_date: new Date(req.body.mjcat_date)
      }

      const created = await empjobcatService.create(obj)

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

EmpjobcatController.get = async (req, res) => {

   try {
      let { mjcat_id } = req.query
      if (!mjcat_id) throw createError.BadRequest()

      const { rows, count } = await empjobcatService.findAllAndCount(mjcat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmpjobcatController.getByPk = async (req, res) => {

   try {
      let { mjcat_id } = req.params
      if (!mjcat_id) throw createError.BadRequest()

      const founded = await empjobcatService.findByPk(mjcat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmpjobcatController.getCollegeDetails = async (req, res) => {

   try {

      const { mjcat_id, subcat_id, mjcat_status } = req.body
      if (!mjcat_id || !subcat_id || !mjcat_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await empjobcatService.getCollegeDetails(mjcat_id, mjcat_status, _start, _limit)
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

EmpjobcatController.update = async (req, res) => {

   try {

      let { mjcat_id } = req.params
      if (!mjcat_id) throw createError.BadRequest()

      let obj = {
         emp_id: req.body.emp_id,
         cat_id: req.body.cat_id,
         subcat_id: req.body.subcat_id,
         mjcat_status: req.body.mjcat_status,
         mjcat_date: new Date(req.body.mjcat_date)
      }

      const founded = await empjobcatService.findByPk(mjcat_id)
      const update = await empjobcatService.update(founded.mjcat_id, obj)

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

EmpjobcatController.delete = async (req, res) => {

   try {

      let { mjcat_id } = req.query
      if (!mjcat_id) throw createError.BadRequest()

      const deleted = await empjobcatService.delete(mjcat_id)

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

module.exports = EmpjobcatController
