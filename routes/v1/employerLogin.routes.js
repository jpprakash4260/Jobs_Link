const express = require("express")
const employerRoutes = express.Router()
const { Login_Register_Controller } = require("../../controllers")
const { employer_validate } = require("../../validators")

// Employer Register Routes

employerRoutes.post('/register', employer_validate.employerRegister, Login_Register_Controller.employer_register)
employerRoutes.post('/verify-email', Login_Register_Controller.employer_Verify_Email)
employerRoutes.post('/verify-mobile', Login_Register_Controller.employer_Verify_Mobile)

// Employer Login Routes

employerRoutes.post('/login', employer_validate.employerLogin, Login_Register_Controller.employer_login)
employerRoutes.post('/forgot-password', employer_validate.empforgotPassword, Login_Register_Controller.emp_forgot_Password)

module.exports = employerRoutes