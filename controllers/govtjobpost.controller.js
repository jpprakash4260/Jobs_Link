'use strict'

const { govtjobpostService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class GovJobPostController { }

GovJobPostController.create = async (req, res) => {

   try {

      let obj = {
         duplicate_from: req.body.duplicate_from,
         jcat_type: req.body.jcat_type,
         unrest_jcat: req.body.unrest_jcat,
         unrest_jsubcat: req.body.unrest_jsubcat,
         unrest_jcode: req.body.unrest_jcode,
         unrest_jname: req.body.unrest_jname,
         unrest_jdesc: req.body.unrest_jdesc,
         unrest_jeducat: req.body.unrest_jeducat,
         unrest_jquali: req.body.unrest_jquali,
         quali_type: req.body.quali_type,
         qualif_txt: req.body.qualif_txt,
         age_limit: req.body.age_limit,
         job_detail: req.body.job_detail,
         unrest_jrequ: req.body.unrest_jrequ,
         unrest_jallow: req.body.unrest_jallow,
         job_type: req.body.job_type,
         key_skills: req.body.key_skills,
         job_exp: req.body.job_exp,
         country_id: req.body.country_id,
         state: req.body.state,
         unrest_jloct: req.body.unrest_jloct,
         unrest_jcompany: req.body.unrest_jcompany,
         unrest_jemail: req.body.unrest_jemail,
         unrest_jphone: req.body.unrest_jphone,
         unrest_sal: req.body.unrest_sal,
         web_url: req.body.web_url,
         sec_title: req.body.sec_title,
         all_india: req.body.all_india,
         statename: req.body.statename,
         cityname: req.body.cityname,
         no_of_openings: req.body.no_of_openings,
         sec_jobtitle: req.body.sec_jobtitle,
         apply: req.body.apply,
         ip_address: req.body.ip_address,
         posted_id: req.body.posted_id,
         posted_by: req.body.posted_by,
         posted_name: req.body.posted_name,
         posted_pos: req.body.posted_pos,
         exp_date: req.body.exp_date,
         posted_status: req.body.posted_status,
         posted_date: new Date(req.body.posted_date)
      }

      console.log(obj);
      const created = await govtjobpostService.create(obj)

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

GovJobPostController.get = async (req, res) => {

   try {
      let { unrst_jid } = req.query
      if (!unrst_jid) throw createError.BadRequest()

      const { rows, count } = await govtjobpostService.findAllAndCount(unrst_jid)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

GovJobPostController.getByPk = async (req, res) => {

   try {
      let { unrst_jid } = req.params
      if (!unrst_jid) throw createError.BadRequest()

      const founded = await govtjobpostService.findByPk(unrst_jid)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

GovJobPostController.getCollegeDetails = async (req, res) => {

   try {

      const { unrst_jid, unrest_jname, posted_status } = req.body
      if (!unrst_jid || !unrest_jname || !posted_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await govtjobpostService.getCollegeDetails(unrst_jid, posted_status, _start, _limit)
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

GovJobPostController.update = async (req, res) => {

   try {

      let { unrst_jid } = req.params
      if (!unrst_jid) throw createError.BadRequest()

      let obj = {
         duplicate_from: req.body.duplicate_from,
         jcat_type: req.body.jcat_type,
         unrest_jcat: req.body.unrest_jcat,
         unrest_jsubcat: req.body.unrest_jsubcat,
         unrest_jcode: req.body.unrest_jcode,
         unrest_jname: req.body.unrest_jname,
         unrest_jdesc: req.body.unrest_jdesc,
         unrest_jeducat: req.body.unrest_jeducat,
         unrest_jquali: req.body.unrest_jquali,
         quali_type: req.body.quali_type,
         qualif_txt: req.body.qualif_txt,
         age_limit: req.body.age_limit,
         job_detail: req.body.job_detail,
         unrest_jrequ: req.body.unrest_jrequ,
         unrest_jallow: req.body.unrest_jallow,
         job_type: req.body.job_type,
         key_skills: req.body.key_skills,
         job_exp: req.body.job_exp,
         country_id: req.body.country_id,
         state: req.body.state,
         unrest_jloct: req.body.unrest_jloct,
         unrest_jcompany: req.body.unrest_jcompany,
         unrest_jemail: req.body.unrest_jemail,
         unrest_jphone: req.body.unrest_jphone,
         unrest_sal: req.body.unrest_sal,
         web_url: req.body.web_url,
         sec_title: req.body.sec_title,
         all_india: req.body.all_india,
         statename: req.body.statename,
         cityname: req.body.cityname,
         no_of_openings: req.body.no_of_openings,
         sec_jobtitle: req.body.sec_jobtitle,
         apply: req.body.apply,
         ip_address: req.body.ip_address,
         posted_id: req.body.posted_id,
         posted_by: req.body.posted_by,
         posted_name: req.body.posted_name,
         posted_pos: req.body.posted_pos,
         exp_date: req.body.exp_date,
         posted_status: req.body.posted_status,
         posted_date: new Date(req.body.posted_date)
      }

      const founded = await govtjobpostService.findByPk(unrst_jid)


      const update = await govtjobpostService.update(founded.unrst_jid, obj)

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

GovJobPostController.delete = async (req, res) => {

   try {

      let { unrst_jid } = req.query
      if (!unrst_jid) throw createError.BadRequest()

      const deleted = await govtjobpostService.delete(unrst_jid)

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

module.exports = GovJobPostController
