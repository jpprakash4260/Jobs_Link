'use strict'

const { enquiryService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class EnquiryController { }

EnquiryController.create = async (req, res) => {

   try {

      let obj = {
         enq_name: req.body.enq_name,
         enq_email: req.body.enq_email,
         enq_mobile: req.body.enq_mobile,
         enq_msg: req.body.enq_msg,
         enq_date: new Date(req.body.enq_date),
         ipaddress: req.body.ipaddress,
         enq_altmobile: req.body.enq_altmobile,
         maincat: req.body.maincat,
         type_home: req.body.type_home,
         type_bhk: req.body.type_bhk,
         enq_loc: req.body.enq_loc
      }

      const created = await enquiryService.create(obj)
      const founded = await enquiryService.findByPk(created.enq_id)

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

EnquiryController.get = async (req, res) => {

   try {
      let { enq_id } = req.query
      if (!enq_id) throw createError.BadRequest()

      const { rows, count } = await enquiryService.findAllAndCount(enq_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EnquiryController.getByPk = async (req, res) => {

   try {
      let { enq_id } = req.params
      if (!enq_id) throw createError.BadRequest()

      const founded = await enquiryService.findByPk(enq_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EnquiryController.getCollegeDetails = async (req, res) => {

   try {

      const { enq_id, enq_name, enq_loc } = req.body
      if (!enq_id || !enq_name || !enq_loc) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await enquiryService.getCollegeDetails(enq_id, enq_loc, _start, _limit)
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

EnquiryController.update = async (req, res) => {

   try {

      let { enq_id } = req.params
      if (!enq_id) throw createError.BadRequest()

      let obj = {
         enq_name: req.body.enq_name,
         enq_email: req.body.enq_email,
         enq_mobile: req.body.enq_mobile,
         enq_msg: req.body.enq_msg,
         enq_date: new Date(req.body.enq_date),
         ipaddress: req.body.ipaddress,
         enq_altmobile: req.body.enq_altmobile,
         maincat: req.body.maincat,
         type_home: req.body.type_home,
         type_bhk: req.body.type_bhk,
         enq_loc: req.body.enq_loc
      }

      const founded = await enquiryService.findByPk(enq_id)


      const update = await enquiryService.update(founded.enq_id, obj)

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

EnquiryController.delete = async (req, res) => {

   try {

      let { enq_id } = req.query
      if (!enq_id) throw createError.BadRequest()

      const deleted = await enquiryService.delete(enq_id)

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

module.exports = EnquiryController
