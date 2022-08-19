const express = require("express")
const seekerRoutes = express.Router()
const { Login_Register_Controller } = require("../../controllers")
const { seeker_validate} = require("../../validators")
const upload = require('../../validators/multer')

// Seeker Register Routes
seekerRoutes.post('/register', seeker_validate.seekerRegister, upload.single("resume"), Login_Register_Controller.register)
seekerRoutes.post('/verify-email', Login_Register_Controller.Verify_Email)
seekerRoutes.post('/verify-mobile', Login_Register_Controller.Verify_Mobile)
seekerRoutes.post('/register-education', seeker_validate.seekerRegEducation, Login_Register_Controller.add_education)

// Seeker Login Routes 

seekerRoutes.post('/login', seeker_validate.seekerLogin, Login_Register_Controller.login)
seekerRoutes.post('/forgot-password', seeker_validate.seekerforgotPassword, Login_Register_Controller.forgot_Password)


module.exports = seekerRoutes