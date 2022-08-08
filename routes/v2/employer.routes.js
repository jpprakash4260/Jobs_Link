const express = require("express");
const employerRoutes = express.Router();

const { employerController } = require("../../controllers");
const { employer_validate ,seeker_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");

// Logged In USER
employerRoutes.get('/employer-dashboard', verifyToken.validateToken, employerController.dashboard);
employerRoutes.post('/emp-change-password', verifyToken.validateToken, employer_validate.empChangePassword, employerController.emp_change_Password);
employerRoutes.post('/emp-postJob', verifyToken.validateToken, employer_validate.empPostJob, employerController.post_job);

module.exports = employerRoutes;