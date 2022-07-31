const express = require("express");
const seekerRoutes = express.Router();

const { seekerController } = require("../../controllers");
const { seeker_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");
const seekerValidator = require("../../validators/seeker.validator");

// Logged In USER
seekerRoutes.get('/dashboard', verifyToken.validateToken, seekerController.dashboard);
seekerRoutes.get('/search', seekerController.search);
seekerRoutes.post('/update-personal-details', verifyToken.validateToken, seekerValidator.seekerPersonalDetails, seekerController.updatePersonal);

module.exports = seekerRoutes;