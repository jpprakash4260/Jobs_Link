const express = require("express")
const seekerRoutes = express.Router()
const { seekerController } = require("../../controllers")
const { verifyToken } = require("../../middleware")
const seekerValidator = require("../../validators/seeker.validator")

seekerRoutes.get('/dashboard', verifyToken.validateToken, seekerController.dashboard)
seekerRoutes.get('/search', seekerController.search)
seekerRoutes.post('/create-personal-details', verifyToken.validateToken, seekerValidator.seekerPersonalDetails, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-personal-details', verifyToken.validateToken, seekerValidator.seekerPersonalDetails, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-Resume-Validation', verifyToken.validateToken, seekerValidator.seekerResumeHeadlines, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-KeySkills', verifyToken.validateToken, seekerValidator.seekerKeySkills, seekerController.updateKeySkills)
seekerRoutes.post('/create-Employement', verifyToken.validateToken, seekerValidator.seekerCreateEmployement, seekerController.createEmployement)
seekerRoutes.get('/get-Employement', verifyToken.validateToken, seekerController.getEmployement)
seekerRoutes.post('/update-Employement', verifyToken.validateToken, seekerValidator.seekerUpdateEmployement, seekerController.update_byId)

module.exports = seekerRoutes