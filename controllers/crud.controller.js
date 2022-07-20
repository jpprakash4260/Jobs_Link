'use strict'

const { crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class CrudController { };
CrudController.createSeeker = async (req, res) => {
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

CrudController.findAllSeeker = async (req, res) => {
    try {
        let data = await crudService.findAllSeeker();
        if (data == null) {
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

CrudController.findOneSeeker = async (req, res) => {
    try {
        const key = Object.keys(req.query);
        const value = Object.values(req.query);
        let data = await crudService.findOneSeeker(key, value);
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

CrudController.findAllMatchSeekers = async (req, res) => {
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

CrudController.updateSeeker_byId = async (req, res) => {
    try {
        const updating_key = Object.keys(req.query);
        const key = updating_key[1]
        const updating_value = Object.values(req.query);
        const value = updating_value[1]
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
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR , responseMessage.errorInUpdating);
    }
};

CrudController.deleteSeeker_byId = async (req,res) => {
    try {
        let seeker_id = req.query.seeker_id
        let data = await crudService.deleteSeeker_byId(seeker_id, modelName);
        if (data == 1) {
            logger.info(loggerMessage.deleteDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.deletedData);
        } else{
            logger.warn(loggerMessage.deleteDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, data, responseMessage.notDeleted);
        }
    } catch (err) {
        logger.error(loggerMessage.deleteDataFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR ,responseMessage.errorInDeleting);
    }
};

module.exports = CrudController;