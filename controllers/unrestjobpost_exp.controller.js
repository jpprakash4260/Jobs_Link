'use strict'

const { unrestjobpost_expService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class UnrestJobPost_ExpController { }

UnrestJobPost_ExpController.create = async (req, res) => {

   try {

      let obj = {
         duplicate_from: req.body.duplicate_from,
         jcat_type: req.body.jcat_type,
         unrest_jcat: req.body.unrest_jcat,
         unrest_jsubcat: req.body.unrest_jsubcat,
         unrest_jcode: req.body.unrest_jcode,
         verify: req.body.verify,
         unrest_jdesc: req.body.unrest_jdesc,
         unrest_jquali: req.body.unrest_jquali,
         unrest_jrequ: req.body.unrest_jrequ,
         high_qualif: req.body.high_qualif,
         high_course: req.body.high_course,
         high_special: req.body.high_special,
         unrest_jallow: req.body.unrest_jallow,
         sal_id: req.body.sal_id,
         jtype_id: req.body.jtype_id,
         jtype_id_new: req.body.jtype_id_new,
         job_type: req.body.job_type,
         key_skills: req.body.key_skills,
         job_exp: req.body.job_exp,
         country_id: req.body.country_id,
         state: req.body.state,
         unrest_jloct: req.body.unrest_jloct,
         unrest_jcompany: req.body.unrest_jcompany,
         comp_detail: req.body.comp_detail,
         unrest_jemail: req.body.unrest_jemail,
         unrest_jphoneold: req.body.unrest_jphoneold,
         unrest_jphone: req.body.unrest_jphone,
         unrest_landline: req.body.unrest_landline,
         unrest_sal: req.body.unrest_sal,
         comp_address: req.body.comp_address,
         apply: req.body.apply,
         ip_address: req.body.ip_address,
         posted_id: req.body.posted_id,
         posted_by: req.body.posted_by,
         posted_name: req.body.posted_name,
         posted_pos: req.body.posted_pos,
         exp_date: new Date(req.body.exp_date),
         posted_status: req.body.posted_status,
         comp_website: req.body.comp_website,
         field_exp: req.body.field_exp,
         nationality: req.body.nationality,
         no_of_openings: req.body.no_of_openings,
         gender: req.body.gender,
         posted_date: new Date(req.body.posted_date)
      }

      const created = await unrestjobpost_expService.create(obj)
      const founded = await unrestjobpost_expService.findByPk(created.unrst_jid)

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

UnrestJobPost_ExpController.get = async (req, res) => {

   try {
      let { unrst_jid } = req.query
      if (!unrst_jid) throw createError.BadRequest()

      const { rows, count } = await unrestjobpost_expService.findAllAndCount(unrst_jid)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

UnrestJobPost_ExpController.getByPk = async (req, res) => {

   try {
      let { unrst_jid } = req.params
      if (!unrst_jid) throw createError.BadRequest()

      const founded = await unrestjobpost_expService.findByPk(unrst_jid)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

UnrestJobPost_ExpController.getCollegeDetails = async (req, res) => {

   try {

      const { unrst_jid, unrest_jcode, posted_status } = req.body
      if (!unrst_jid || !unrest_jcode || !posted_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await unrestjobpost_expService.getCollegeDetails(unrst_jid, posted_status, _start, _limit)
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

UnrestJobPost_ExpController.update = async (req, res) => {

   try {

      let { unrst_jid } = req.params
      if (!unrst_jid) throw createError.BadRequest()

      let obj = {
         duplicate_from: req.body.duplicate_from,
         jcat_type: req.body.jcat_type,
         unrest_jcat: req.body.unrest_jcat,
         unrest_jsubcat: req.body.unrest_jsubcat,
         unrest_jcode: req.body.unrest_jcode,
         verify: req.body.verify,
         unrest_jdesc: req.body.unrest_jdesc,
         unrest_jquali: req.body.unrest_jquali,
         unrest_jrequ: req.body.unrest_jrequ,
         high_qualif: req.body.high_qualif,
         high_course: req.body.high_course,
         high_special: req.body.high_special,
         unrest_jallow: req.body.unrest_jallow,
         sal_id: req.body.sal_id,
         jtype_id: req.body.jtype_id,
         jtype_id_new: req.body.jtype_id_new,
         job_type: req.body.job_type,
         key_skills: req.body.key_skills,
         job_exp: req.body.job_exp,
         country_id: req.body.country_id,
         state: req.body.state,
         unrest_jloct: req.body.unrest_jloct,
         unrest_jcompany: req.body.unrest_jcompany,
         comp_detail: req.body.comp_detail,
         unrest_jemail: req.body.unrest_jemail,
         unrest_jphoneold: req.body.unrest_jphoneold,
         unrest_jphone: req.body.unrest_jphone,
         unrest_landline: req.body.unrest_landline,
         unrest_sal: req.body.unrest_sal,
         comp_address: req.body.comp_address,
         apply: req.body.apply,
         ip_address: req.body.ip_address,
         posted_id: req.body.posted_id,
         posted_by: req.body.posted_by,
         posted_name: req.body.posted_name,
         posted_pos: req.body.posted_pos,
         exp_date: new Date(req.body.exp_date),
         posted_status: req.body.posted_status,
         comp_website: req.body.comp_website,
         field_exp: req.body.field_exp,
         nationality: req.body.nationality,
         no_of_openings: req.body.no_of_openings,
         gender: req.body.gender,
         posted_date: new Date(req.body.posted_date)
      }

      const founded = await unrestjobpost_expService.findByPk(unrst_jid)


      const update = await unrestjobpost_expService.update(founded.unrst_jid, obj)

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

UnrestJobPost_ExpController.delete = async (req, res) => {

   try {

      let { unrst_jid } = req.query
      if (!unrst_jid) throw createError.BadRequest()

      const deleted = await unrestjobpost_expService.delete(unrst_jid)

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

module.exports = UnrestJobPost_ExpController
