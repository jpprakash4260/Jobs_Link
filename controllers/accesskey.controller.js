'use strict'
const { accessKeyService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require("sequelize")
const moment = require('moment')
const createError = require("http-errors")

class AccessKeyController { }

AccessKeyController.create = async (req, res) => {

   try {

      let obj = {
         access_key: req.body.access_key,
         user_id: Number(req.body.user_id),
         user_type: req.body.user_type,
         access_status: "Y",
         access_expdt: req.body.access_expdt,
         access_dt: req.body.access_dt,
         access_ip: req.ip,
         access_lastupdate: ''
      }

      const created = await accessKeyService.create(obj)

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

AccessKeyController.get = async (req, res) => {

   try {
      let { access_id } = req.query
      if (!access_id) throw createError.BadRequest()

      const { rows, count } = await accessKeyService.findAllAndCount(access_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, rows, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AccessKeyController.getOneUser = async (req, res) => {

   try {
      let { access_id } = req.params
      if (!access_id) throw createError.BadRequest()

      const founded = await accessKeyService.findByPk(access_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, responseMessage.getDataSuccess)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AccessKeyController.getAccessDetails = async (req, res) => {

   try {
      const { access_id, access_key, user_type } = req.body;
      if (!access_id || !access_key || !user_type) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0;
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10;
      let search = req.body && req.body.search ? req.body.search : '';

      if (search) {
         where['access_key'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await accessKeyService.getAccessDetails(access_id, _start, _limit)
      if (!totalAccess) throw createError.NotFound('total not found !!')

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, totalAccess, responseMessage.getDataSuccess)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

AccessKeyController.update = async (req, res) => {

   try {
      let { access_id } = req.params
      if (!access_id) throw createError.BadRequest()

      let obj = {
         access_key: req.body.access_key,
         user_id: Number(req.body.user_id),
         user_type: req.body.user_type,
         access_status: "Y",
         access_expdt: moment(new Date(req.body.access_expdt)).format("YYYY-MM-DD HH:mm:ss"),
         access_dt: moment(new Date(req.body.access_dt)).format("YYYY-MM-DD HH:mm:ss"),
         access_ip: req.ip,
         access_lastupdate: moment(Date.now()).format("YYYY-MM-DD h:mm:ss a")
      }

      // console.log("new expdt: ", moment(new Date(req.body.access_expdt)).format("YYYY-MM-DD HH:mm:ss"))
      // console.log("new dt   : ", moment(new Date(req.body.access_dt)).format("YYYY-MM-DD HH:mm:ss"), '\n')
      const update = await accessKeyService.update(access_id, obj)

      if (update == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_CREATED, obj, responseMessage.updateDataSuccess)
      }
      else if (update == 'Exited Values') {
         logger.warn(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_CREATED, update, responseMessage.alreadyExited)
      }
      else if (update == 'Access Not Found') {
         logger.error(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_CREATED, update, responseMessage.notFound)
      }
      else if (update == 0) {
         logger.error(loggerMessage.notUpdated)
         return response.success(req, res, statusCodes.HTTP_CREATED, update, responseMessage.notUpdated)
      }
      else {
         logger.error(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_CREATED, update, responseMessage.updateDataFailure)
      }
   }
   catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInUpdating)
      return response.success(req, res, statusCodes.HTTP_CREATED, error, responseMessage.errorInUpdating)
   }
}

AccessKeyController.delete = async (req, res) => {

   try {

      let { access_id } = req.query
      if (!access_id) throw createError.BadRequest()

      const deleted = await accessKeyService.delete(access_id)
      console.log('deleted : ', deleted);

      if (deleted == 1) {
         logger.error(loggerMessage.deleteDataSuccess)
         return response.success(req, res, statusCodes.HTTP_CREATED, deleted, responseMessage.deletedData)
      }
      else if (deleted == 'Access not found') {
         logger.error(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_CREATED, deleted, responseMessage.notFound)
      }
      else {
         logger.error(loggerMessage.notDeleted)
         return response.success(req, res, statusCodes.HTTP_CREATED, deleted, responseMessage.notDeleted)
      }
   }
   catch (error) {
      console.log(error);
      logger.error(loggerMessage.errorInDeleting)
      return response.success(req, res, statusCodes.HTTP_CREATED, error, responseMessage.errorInDeleting)
   }
}

module.exports = AccessKeyController
