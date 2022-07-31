const express = require("express");
const crudRoutes = express.Router();
const { crudController } = require("../../controllers");
const { seeker_validate } = require("../../validators");


// USER Routes
crudRoutes.post('/create', crudController.create)
crudRoutes.get('/findAll', crudController.findAll)
crudRoutes.get('/findByPk', crudController.findByPk)
crudRoutes.get('/findOne', crudController.findOne)
crudRoutes.get('/findAllMatch', crudController.findAllMatch)
crudRoutes.put('/update', crudController.update)
crudRoutes.delete('/delete', crudController.delete)
crudRoutes.get('/truncate', crudController.truncate)
crudRoutes.get('/query', crudController.findOnesome)


module.exports = crudRoutes;
