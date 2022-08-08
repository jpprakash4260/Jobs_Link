const express = require("express");
const loginRegisterRoutes = express.Router();
const { loginRegisterController } = require("../../controllers")
const { verifyToken } = require("../../middleware");
const { seeker_validate , employer_validate, upload } = require("../../validators");

// Register and Login Routes

loginRegisterRoutes.post('/seeker-register', seeker_validate.seekerRegister, upload.single("resume"), loginRegisterController.seeker_register)
loginRegisterRoutes.post('/seeker-register-education',   seeker_validate.seekerRegEducation,          loginRegisterController.seeker_register_education)
loginRegisterRoutes.post('/seeker-verify-email',         seeker_validate.seekerVerifyEmail,           loginRegisterController.seeker_Verify_Email)
loginRegisterRoutes.post('/seeker-verify-mobile',        seeker_validate.seekerVerifyMobile,          loginRegisterController.seeker_Verify_Mobile)
loginRegisterRoutes.post('/seeker-login',                seeker_validate.seekerLogin,                 loginRegisterController.seeker_login)
loginRegisterRoutes.post('/seeker-forgot-password',      seeker_validate.seekerforgotPassword,        loginRegisterController.seeker_forgot_Password)
loginRegisterRoutes.post('/employer-register',           employer_validate.employerRegister,          loginRegisterController.employer_register)
loginRegisterRoutes.post('/employer-verify-email',       employer_validate.employerVerifyEmail,       loginRegisterController.employer_Verify_Email)
loginRegisterRoutes.post('/employer-verify-mobile',      employer_validate.employerVerifyMobile,      loginRegisterController.employer_Verify_Mobile)
loginRegisterRoutes.post('/employer-login',              employer_validate.employerLogin,             loginRegisterController.employer_login)
loginRegisterRoutes.post('/emp-forgot-password',         employer_validate.empforgotPassword,         loginRegisterController.emp_forgot_Password)

module.exports = loginRegisterRoutes
