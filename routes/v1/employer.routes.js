const express = require("express");
const employerRoutes = express.Router();

const { employerController } = require("../../controllers");
const { seeker_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");

// Logged In USER
employerRoutes.get('/employer-dashboard', verifyToken.validateToken, employerController.dashboard);

module.exports = employerRoutes;