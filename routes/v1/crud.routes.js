const express = require("express");
const crudRoutes = express.Router();
const { crudController } = require("../../controllers");
const CrudController = require("../../controllers/crud.controller");
const { seeker_validate } = require("../../validators");


// USER Routes
crudRoutes.post('/create', crudController.create)
crudRoutes.get('/findAll', crudController.findAll)
crudRoutes.get('/findByPk', crudController.findByPk)
crudRoutes.get('/findOne', crudController.findOne)
crudRoutes.get('/findAllMatch', crudController.findAllMatch)
crudRoutes.put('/update', crudController.update)
crudRoutes.delete('/delete', crudController.delete)
crudRoutes.get('/truncate/:tableName', crudController.truncate)
crudRoutes.get('/query', crudController.findOnesome)
crudRoutes.get('/get_IP', CrudController.get_IP)


module.exports = crudRoutes;
