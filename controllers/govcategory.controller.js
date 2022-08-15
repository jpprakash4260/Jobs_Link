'use strict'

const { govcategoryService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const moment = require('moment')
const createError = require('http-errors')

class GovCategoryController { }

GovCategoryController.create = async (req, res) => {

   try {

      let obj = {
         pid: req.body.pid,
         gcat_name: req.body.gcat_name,
         gcat_slug: req.body.gcat_slug,
         gcat_code: req.body.gcat_code,
         gcat_icon: req.body.gcat_icon,
         gcat_desc: req.body.gcat_desc,
         gcat_image: req.body.gcat_image,
         gcat_pos: req.body.gcat_pos,
         gcat_status: req.body.gcat_status,
         foot_status: req.body.foot_status,
         gcat_dt: new Date(req.body.gcat_dt)
      }

      const created = await govcategoryService.create(obj)
      const founded = await govcategoryService.findByPk(created.gcat_id)

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

GovCategoryController.get = async (req, res) => {

   try {
      let { gcat_id } = req.query
      if (!gcat_id) throw createError.BadRequest()

      const { rows, count } = await govcategoryService.findAllAndCount(gcat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

GovCategoryController.getByPk = async (req, res) => {

   try {
      let { gcat_id } = req.params
      if (!gcat_id) throw createError.BadRequest()

      const founded = await govcategoryService.findByPk(gcat_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

GovCategoryController.getCollegeDetails = async (req, res) => {

   try {

      const { gcat_id, colg_name, colg_status } = req.body
      if (!gcat_id || !colg_name || !colg_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await govcategoryService.getCollegeDetails(gcat_id, colg_status, _start, _limit)
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

GovCategoryController.update = async (req, res) => {

   try {

      let { gcat_id } = req.params
      if (!gcat_id) throw createError.BadRequest()

      let obj = {
         pid: req.body.pid,
         gcat_name: req.body.gcat_name,
         gcat_slug: req.body.gcat_slug,
         gcat_code: req.body.gcat_code,
         gcat_icon: req.body.gcat_icon,
         gcat_desc: req.body.gcat_desc,
         gcat_image: req.body.gcat_image,
         gcat_pos: req.body.gcat_pos,
         gcat_status: req.body.gcat_status,
         foot_status: req.body.foot_status,
         gcat_dt: new Date(req.body.gcat_dt)
      }

      const founded = await govcategoryService.findByPk(gcat_id)
      if (!founded) throw createError.NotFound()

      const update = await govcategoryService.update(founded.gcat_id, obj)

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

GovCategoryController.delete = async (req, res) => {

   try {

      let { gcat_id } = req.query
      if (!gcat_id) throw createError.BadRequest()

      const deleted = await govcategoryService.delete(gcat_id)

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

module.exports = GovCategoryController
