'use strict'

const { crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class CrudController { };
CrudController.create = async (req, res) => {
    try {
        let data = await crudService.create(req, res);
        if (data.message && data.field) {
            logger.warn(loggerMessage.not_unique);
            return response.errors(req, res, statusCodes.HTTP_CONFLICT, data, responseMessage.Not_Unique);
        } else {
            logger.info(loggerMessage.getDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.createdSuccess);
        }

    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.notCreated)
    }
};

CrudController.findAll = async (req, res) => {
    try {
        let data = await crudService.findAll('Employee');
        if (data) {
            logger.info(loggerMessage.showedDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerFounded);
        } else {
            logger.warn(loggerMessage.showedDataSuccess);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, data, responseMessage.noSeeker);
        }
    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingAll);
    }
};

CrudController.findByPk = async (req, res) => {
    try {
        let seeker_id = req.query.seeker_id
        let data = await crudService.findByPk(seeker_id);
        if (data) {
            logger.info(loggerMessage.showedDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerFounded);
        } else {
            logger.warn(loggerMessage.showedDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, data, responseMessage.noSeeker);
        }
    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindingId);
    }
};

CrudController.findOne = async (req, res) => {
    try {
        const key = Object.keys(req.query);
        const value = Object.values(req.query);
        let data = await crudService.findOne({ [key]: value }, 'Employee');
        if (data) {
            logger.info(loggerMessage.showedDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerFounded);
        } else {
            logger.warn(loggerMessage.showedDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, data, responseMessage.noSeeker);
        }
    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindOne);
    }
};

CrudController.findAllMatch = async (req, res) => {
    try {
        const key = Object.keys(req.query);
        const value = Object.values(req.query);
        let data = await crudService.findAllMatchSeekers(key, value);
        if (data) {
            logger.info(loggerMessage.showedDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerFounded);
        } else {
            logger.warn(loggerMessage.showedDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, data, responseMessage.noSeeker);
        }
    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInFindAllMatch);
    }
};

CrudController.update = async (req, res) => {
    try {
        const obj = req.query
        console.log(obj);
        let data_ = await crudService.updateSeeker_byId(req, res, key, value);
        let seeker_id = req.query.seeker_id
        let data = await crudService.findByPk(seeker_id);
        if (data_ == 1) {
            logger.info(loggerMessage.updateDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerUpdated);
        } else {
            logger.warn(loggerMessage.updateDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, data, responseMessage.seekerNotUpdated);
        }
    } catch (err) {
        logger.error(loggerMessage.updateDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInUpdating);
    }
};

CrudController.delete = async (req, res) => {
    try {
        let seeker_id = req.query.seeker_id
        let data = await crudService.deleteSeeker_byId(obj, modelName);
        if (data == 1) {
            logger.info(loggerMessage.deleteDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.deletedData);
        } else {
            logger.warn(loggerMessage.deleteDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, data, responseMessage.notDeleted);
        }
    } catch (err) {
        logger.error(loggerMessage.deleteDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInDeleting);
    }
};

CrudController.truncate = async (req, res) => {
    try {
        var tableName = req.params
        const truncate = await crudService.Truncate(tableName.tableName)
        if (truncate[0] && truncate[0].fieldCount == 0 && truncate[0].affectedRows == 0 && truncate[0].insertId == 0 && truncate[0].info == '' && truncate[0].serverStatus == 2 && truncate[0].warningStatus == 0) {
            logger.info(loggerMessage.deleteDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, truncate[0], responseMessage.deletedData);
        } else {
            logger.warn(loggerMessage.deleteDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, truncate, responseMessage.notDeleted);
        }
    } catch (err) {
        logger.error(loggerMessage.deleteDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errorInDeleting);
    }
};

CrudController.findOnesome = async (req, res) => {
    try {
        let data = await crudService.findAllQuery('tbl__employee');
        if (data) {
            logger.info(loggerMessage.showedDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.seekerFounded);
        } else {
            logger.warn(loggerMessage.showedDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, data, responseMessage.noSeeker);
        }
    } catch (err) {
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInFindOne);
    }
};

CrudController.get_IP = async (req, res) => {
    try {
        const IP_address = await crudService.get_IP()
        logger.info(loggerMessage.showedDataSuccess);
        return response.success(req, res, statusCodes.HTTP_OK, IP_address, responseMessage.seekerFounded);
    } catch (err) {
        console.log(err);
        logger.error(loggerMessage.getDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInFindOne);
    }
}


module.exports = CrudController;