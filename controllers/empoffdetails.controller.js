'use strict'

const { empoffdetailsService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class EmpOfficialDetailsController { }

EmpOfficialDetailsController.create = async (req, res) => {

   try {

      let obj = {
         emp_id: req.body.emp_id,
         emp_desig: req.body.emp_desig,
         emp_org: req.body.emp_org,
         exp_yr: req.body.exp_yr,
         cur_comp: req.body.cur_comp,
         exp_month: req.body.exp_month,
         exp_yr_to: req.body.exp_yr_to,
         exp_month_to: req.body.exp_month_to,
         sal_type: req.body.sal_type,
         sal_lakhs: req.body.sal_lakhs,
         sal_thousand: req.body.sal_thousand,
         emp_detail: req.body.emp_detail,
         wrk_status: req.body.wrk_status,
         wrk_date: new Date(req.body.wrk_date)
      }

      const created = await empoffdetailsService.create(obj)

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

EmpOfficialDetailsController.get = async (req, res) => {

   try {
      let { wrk_id } = req.query
      if (!wrk_id) throw createError.BadRequest()

      const { rows, count } = await empoffdetailsService.findAllAndCount(wrk_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmpOfficialDetailsController.getByPk = async (req, res) => {

   try {
      let { wrk_id } = req.params
      if (!wrk_id) throw createError.BadRequest()

      const founded = await empoffdetailsService.findByPk(wrk_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmpOfficialDetailsController.getCollegeDetails = async (req, res) => {

   try {

      const { wrk_id, emp_id, wrk_status } = req.body
      if (!wrk_id || !emp_id || !wrk_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await empoffdetailsService.getCollegeDetails(wrk_id, wrk_status, _start, _limit)
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

EmpOfficialDetailsController.update = async (req, res) => {

   try {

      let { wrk_id } = req.params
      if (!wrk_id) throw createError.BadRequest()

      let obj = {
         emp_id: req.body.emp_id,
         emp_desig: req.body.emp_desig,
         emp_org: req.body.emp_org,
         exp_yr: req.body.exp_yr,
         exp_month: req.body.exp_month,
         exp_yr_to: req.body.exp_yr_to,
         exp_month_to: req.body.exp_month_to,
         sal_type: req.body.sal_type,
         sal_lakhs: req.body.sal_lakhs,
         sal_thousand: req.body.sal_thousand,
         emp_detail: req.body.emp_detail,
         wrk_status: req.body.wrk_status,
         wrk_date: new Date(req.body.wrk_date)
      }

      const founded = await empoffdetailsService.findByPk(wrk_id)


      const update = await empoffdetailsService.update(founded.wrk_id, obj)

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

EmpOfficialDetailsController.delete = async (req, res) => {

   try {

      let { wrk_id } = req.query
      if (!wrk_id) throw createError.BadRequest()

      const deleted = await empoffdetailsService.delete(wrk_id)

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

module.exports = EmpOfficialDetailsController
