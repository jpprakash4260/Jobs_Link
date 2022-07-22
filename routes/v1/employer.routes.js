const express = require("express");
const employerRoutes = express.Router();

const { employerController } = require("../../controllers");
const { employer_validate ,seeker_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");

// Logged In USER
employerRoutes.get('/employer-dashboard', verifyToken.validateToken, employerController.dashboard);
employerRoutes.post('/emp-change-password', verifyToken.validateToken, employer_validate.empChangePassword, employerController.change_Password);

module.exports = employerRoutes;