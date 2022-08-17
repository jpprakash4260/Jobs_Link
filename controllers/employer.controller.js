'use strict'

const { employerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper')
const createError = require('http-errors')

class EmployerController { };

EmployerController.create = async (req, res) => {

   try {

      let obj = {
         comp_name: req.body.comp_name,
         mail_id: req.body.mail_id,
         mobile_no: req.body.mobile_no,
         cont_person: req.body.cont_person,
         indust_id: req.body.indust_id,
         comp_pass: req.body.comp_pass,
         pincode: req.body.pincode,
         country_id: req.body.country_id,
         state_id: req.body.state_id,
         unrest_jloct: req.body.unrest_jloct,
         recut_address: req.body.recut_address,
         recut_desc: req.body.recut_desc,
         ipaddress: req.ip
      }

      const created = await employerService.create(obj)

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

EmployerController.get = async (req, res) => {

   try {
      let { recut_id } = req.query
      if (!recut_id) throw createError.BadRequest()

      const { rows, count } = await employerService.findAllAndCount(recut_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmployerController.getByPk = async (req, res) => {

   try {
      let { recut_id } = req.params
      if (!recut_id) throw createError.BadRequest()

      const founded = await employerService.findByPk(recut_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

EmployerController.getCollegeDetails = async (req, res) => {

   try {

      const { recut_id, comp_name, recut_status } = req.body
      if (!recut_id || !comp_name || !recut_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await employerService.getCollegeDetails(recut_id, recut_status, _start, _limit)
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

EmployerController.update = async (req, res) => {

   try {

      let { recut_id } = req.params
      if (!recut_id) throw createError.BadRequest()

      let obj = {
         comp_name: req.body.comp_name,
         mail_id: req.body.mail_id,
         mobile_no: req.body.mobile_no,
         cont_person: req.body.cont_person,
         indust_id: req.body.indust_id,
         comp_pass: req.body.comp_pass,
         pincode: req.body.pincode,
         country_id: req.body.country_id,
         state_id: req.body.state_id,
         recut_address: req.body.recut_address,
         recut_desc: req.body.recut_desc,
         ipaddress: req.ip
      }

      const founded = await employerService.findByPk(recut_id)
      const update = await employerService.update(founded.recut_id, obj)

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

EmployerController.delete = async (req, res) => {

   try {

      let { recut_id } = req.query
      if (!recut_id) throw createError.BadRequest()

      const deleted = await employerService.delete(recut_id)

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


EmployerController.dashboard = async (req, res) => {
   try {
      let data = req.valid_user
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}

EmployerController.emp_change_Password = async (req, res) => {
   try {
      const changed_Password = await crudService.updateEmp_byId(req.employer_id, { comp_pass: req.body.new_pass })
      if (changed_Password == 1) {
         logger.info(loggerMessage.changedPassword)
         return response.success(req, res, statusCodes.HTTP_OK, req.valid_user.email, responseMessage.changedPassword)
      } else if (changed_Password == 2) {
         logger.error(loggerMessage.alreadyExited)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.valid_user.email, responseMessage.alreadyExited)
      } else {
         logger.error(loggerMessage.notchangedPass)
         return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.valid_user.email, responseMessage.notchangedPass)
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_EXPECTATION_FAILED, req.employer_id, responseMessage.errorInUpdating)
   }
}

EmployerController.post_job = async (req, res) => {
   try {
      console.log("employer_id : ", req.employer_id);
      const data = await employerService.postJob(req, 'UnrestJobPost')
      if (Object.keys(data).length == 1 && Object.keys(data)[0] == 'unrst_jid') {
         logger.info(loggerMessage.alreadyExitedJob);
         return response.success(req, res, statusCodes.HTTP_ALREADY_REPORTED, data, responseMessage.alreadyExitedJob);
      } else {
         logger.warn(loggerMessage.jobPosted);
         return response.errors(req, res, statusCodes.HTTP_OK, data, responseMessage.jobPosted);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate)
   }
}

module.exports = EmployerController