'use strict'

const { jobpostingService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class JobPostingController { }

JobPostingController.create = async (req, res) => {

   try {

      let obj = {
         job_code: req.body.job_code,
         posted_by: req.seeker_id,
         jcat_id: req.body.jcat_id,
         jsub_id: req.body.jsub_id,
         cont_mail: req.body.cont_mail,
         cont_mob: req.body.cont_mob,
         sal_range: req.body.sal_range,
         indust_id: req.body.indust_id,
         empl_type: req.body.empl_type,
         emp_educ: req.body.emp_educ,
         emp_exp: req.body.emp_exp,
         emp_specal: req.body.emp_specal,
         job_desc: req.body.job_desc,
         job_status: req.body.job_status,
         posted_type: req.body.posted_type,
         job_expdate: new Date(req.body.job_expdate),
         job_date: new Date(req.body.job_date),
         ipaddress: req.body.ipaddress
      }

      const created = await jobpostingService.create(obj)
      const founded = await jobpostingService.findByPk(created.job_id)

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

JobPostingController.get = async (req, res) => {

   try {
      let { job_id } = req.query
      if (!job_id) throw createError.BadRequest()

      const { rows, count } = await jobpostingService.findAllAndCount(job_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

JobPostingController.getByPk = async (req, res) => {

   try {
      let { job_id } = req.params
      if (!job_id) throw createError.BadRequest()

      const founded = await jobpostingService.findByPk(job_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

JobPostingController.getCollegeDetails = async (req, res) => {

   try {

      const { job_id, cont_mail, job_status } = req.body
      if (!job_id || !cont_mail || !job_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await jobpostingService.getCollegeDetails(job_id, job_status, _start, _limit)
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

JobPostingController.update = async (req, res) => {

   try {

      let { job_id } = req.params
      if (!job_id) throw createError.BadRequest()

      let obj = {
         job_code: req.body.job_code,
         posted_by: req.body.posted_by,
         jcat_id: req.body.jcat_id,
         jsub_id: req.body.jsub_id,
         cont_mail: req.body.cont_mail,
         cont_mob: req.body.cont_mob,
         sal_range: req.body.sal_range,
         indust_id: req.body.indust_id,
         empl_type: req.body.empl_type,
         emp_educ: req.body.emp_educ,
         emp_exp: req.body.emp_exp,
         emp_specal: req.body.emp_specal,
         job_desc: req.body.job_desc,
         job_status: req.body.job_status,
         posted_type: req.body.posted_type,
         job_expdate: new Date(req.body.job_expdate),
         job_date: new Date(req.body.job_date),
         ipaddress: req.body.ipaddress
      }

      const founded = await jobpostingService.findByPk(job_id)


      const update = await jobpostingService.update(founded.job_id, obj)

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

JobPostingController.delete = async (req, res) => {

   try {

      let { job_id } = req.query
      if (!job_id) throw createError.BadRequest()

      const deleted = await jobpostingService.delete(job_id)

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

module.exports = JobPostingController
