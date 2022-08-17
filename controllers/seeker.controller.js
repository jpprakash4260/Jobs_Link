'use strict'

const { seekerService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
const createError = require('http-errors')

class SeekerController { };

SeekerController.create = async (req, res) => {

   try {

      let obj = {
         emp_name: req.body.emp_name,
         emp_email: req.body.emp_email,
         emp_pass: req.body.emp_pass,
         emp_mobile: req.body.emp_mobile,
         emp_country: req.body.emp_country,
         emp_state: req.body.emp_state,
         emp_city: req.body.emp_city,
         agreechk: req.body.agreechk
      }

      const created = await seekerService.create(obj)

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

SeekerController.get = async (req, res) => {

   try {
      let { emp_id } = req.query
      if (!emp_id) throw createError.BadRequest()

      const { rows, count } = await seekerService.findAllAndCount(emp_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, { rows, count }, rows ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

SeekerController.getByPk = async (req, res) => {

   try {
      let { emp_id } = req.params
      if (!emp_id) throw createError.BadRequest()

      const founded = await seekerService.findByPk(emp_id)

      logger.info(loggerMessage.getDataSuccess)
      return response.success(req, res, statusCodes.HTTP_OK, founded, founded ? responseMessage.getDataSuccess : responseMessage.notFound)
   }
   catch (error) {
      console.log(error)
      logger.error(loggerMessage.errorInFindAllMatch)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, error, responseMessage.errorInFindAllMatch)
   }
}

SeekerController.getCollegeDetails = async (req, res) => {

   try {

      const { emp_id, emp_name, emp_status } = req.body
      if (!emp_id || !emp_name || !emp_status) throw createError.BadRequest()

      let _start = req.body && req.body._start ? Number(req.body._start) : 0
      let _limit = req.body && req.body._limit ? Number(req.body._limit) : 10
      let search = req.body && req.body.search ? req.body.search : ''

      if (search) {
         where['chat_fname'] = {
            [Op.like]: `%${search}%`
         }
      }

      const totalAccess = await seekerService.getCollegeDetails(emp_id, emp_status, _start, _limit)
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

SeekerController.update = async (req, res) => {

   try {

      let { emp_id } = req.params
      if (!emp_id) throw createError.BadRequest()

      let obj = {
         emp_name: req.body.emp_name,
         emp_email: req.body.emp_email,
         emp_pass: req.body.emp_pass,
         emp_mobile: req.body.emp_mobile,
         emp_country: req.body.emp_country,
         emp_state: req.body.emp_state,
         emp_city: req.body.emp_city
      }

      const update = await seekerService.update(emp_id, obj)
      const founded = await seekerService.findByPk(emp_id)

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

SeekerController.delete = async (req, res) => {

   try {

      let { emp_id } = req.query
      if (!emp_id) throw createError.BadRequest()

      const deleted = await seekerService.delete(emp_id)

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


SeekerController.dashboard = async (req, res) => {
   try {
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, req.valid_user, responseMessage.dashboard);
   } catch (err) {
      return err
   }
}

SeekerController.search = async (req, res) => {
   try {
      const search = await crudService.search(req, 'Employee')
      search ? search : search = ''
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, search, responseMessage.getDataSuccess);
   } catch (err) {
      return err
   }
}

SeekerController.updateSeekerDetails = async (req, res) => {
   try {
      const updated = await crudService.updateSeeker_byId(req.seeker_id, req.body)
      if (updated == 1) {
         logger.info(loggerMessage.updateDataSuccess);
         return response.success(req, res, statusCodes.HTTP_OK, updated, responseMessage.seekerUpdated);
      } else if (updated == 2) {
         logger.warn(loggerMessage.alreadyExited);
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, updated, responseMessage.alreadyExited);
      }
      else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, updated, responseMessage.seekerNotUpdated);
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

SeekerController.updateKeySkills = async (req, res) => {
   try {
      const KeySkills = await crudService.createKeySkills(req, res)
      console.log("KeysSkills : ", KeySkills.empkskil_id);
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, KeySkills, responseMessage.getDataSuccess);
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

SeekerController.createEmployement = async (req, res) => {
   try {
      const createEmployement = await crudService.createEmployement(req, res)
      // console.log("Employement : ", Employement);
      logger.info(loggerMessage.createdSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, createEmployement, responseMessage.createdSuccess);
   } catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate);
   }
}

SeekerController.getEmployement = async (req, res) => {
   try {
      const getEmployement = await crudService.getEmployement(req, res)
      logger.info(loggerMessage.getDataSuccess);
      return response.success(req, res, statusCodes.HTTP_OK, getEmployement[0], responseMessage.getDataSuccess);
   } catch (err) {
      logger.error(loggerMessage.errorInFindingAll);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInFindOne);
   }
}

SeekerController.update_byId = async (req, res) => {
   try {
      const updated = await crudService.update_byId(1, req.body)
      if (updated == 1) {
         logger.info(loggerMessage.updateDataSuccess);
         return response.success(req, res, statusCodes.HTTP_OK, updated, responseMessage.seekerUpdated);
      } else if (updated == 2) {
         logger.warn(loggerMessage.alreadyExited);
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, updated, responseMessage.alreadyExited);
      }
      else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, updated, responseMessage.seekerNotUpdated);
      }
   } catch (err) {
      logger.error(loggerMessage.errorInUpdating);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

module.exports = SeekerController
