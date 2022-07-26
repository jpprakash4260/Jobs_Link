const express = require("express");
const loginRegisterRoutes = express.Router();

const { loginRegisterController } = require("../../controllers")
const { verifyToken } = require("../../middleware");
const { seeker_validate , employer_validate, upload } = require("../../validators");

// Register and Login Routes

loginRegisterRoutes.post('/seeker-register', seeker_validate.seekerRegister, upload.single("resume"), loginRegisterController.seeker_register);
loginRegisterRoutes.post('/seeker-register-education',   seeker_validate.seekerRegEducation,          loginRegisterController.seeker_register_education);
loginRegisterRoutes.post('/seeker-verify',               seeker_validate.seekerVerify,                loginRegisterController.seeker_Verify);
loginRegisterRoutes.post('/seeker-login',                seeker_validate.seekerLogin,                 loginRegisterController.seeker_login);
loginRegisterRoutes.post('/employer-register',           employer_validate.employerRegister,          loginRegisterController.employer_register);
loginRegisterRoutes.post('/employer-verify',             employer_validate.employerVerify,            loginRegisterController.employer_Verify);
loginRegisterRoutes.post('/employer-login',              employer_validate.employerLogin,             loginRegisterController.employer_login);
loginRegisterRoutes.post('/emp-forgot-password',         employer_validate.empforgotPassword,         loginRegisterController.emp_forgot_Password);

module.exports = loginRegisterRoutes;
