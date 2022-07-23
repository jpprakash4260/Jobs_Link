const express = require("express");
const crudRoutes = express.Router();
const { crudController } = require("../../controllers");
const { seeker_validate } = require("../../validators");


// USER Routes
crudRoutes.post('/createSeeker', crudController.createSeeker);
crudRoutes.get('/findAllSeeker', crudController.findAllSeeker);
crudRoutes.get('/findByPk', crudController.findByPk);
crudRoutes.get('/findOneSeeker', crudController.findOneSeeker);
crudRoutes.get('/findAllMatchSeekers', crudController.findAllMatchSeekers);
crudRoutes.put('/updateSeeker_byId', crudController.updateSeeker_byId);
crudRoutes.delete('/deleteSeeker_byId', crudController.deleteSeeker_byId);

module.exports = crudRoutes;
