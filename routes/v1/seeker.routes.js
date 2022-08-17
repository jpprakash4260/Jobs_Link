const express = require("express")
const seekerRoutes = express.Router()
const { seekerController } = require("../../controllers")
const { verifyToken } = require("../../middleware")
const { seeker_validate } = require("../../validators")


seekerRoutes.post("/", seeker_validate.create, seekerController.create)
seekerRoutes.get("/", seekerController.get)
seekerRoutes.get("/:emp_id", seekerController.getByPk)
seekerRoutes.post("/Details", seekerController.getCollegeDetails)
seekerRoutes.put("/:emp_id", seeker_validate.update, seekerController.update)
seekerRoutes.delete("/delete", seekerController.delete)


seekerRoutes.get('/dashboard', verifyToken.validateToken, seekerController.dashboard)
seekerRoutes.get('/search', seekerController.search)
seekerRoutes.post('/create-personal-details', verifyToken.validateToken, seeker_validate.seekerPersonalDetails, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-personal-details', verifyToken.validateToken, seeker_validate.seekerPersonalDetails, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-Resume-Validation', verifyToken.validateToken, seeker_validate.seekerResumeHeadlines, seekerController.updateSeekerDetails)
seekerRoutes.post('/update-KeySkills', verifyToken.validateToken, seeker_validate.seekerKeySkills, seekerController.updateKeySkills)
seekerRoutes.post('/create-Employement', verifyToken.validateToken, seeker_validate.seekerCreateEmployement, seekerController.createEmployement)
seekerRoutes.get('/get-Employement', verifyToken.validateToken, seekerController.getEmployement)
seekerRoutes.post('/update-Employement', verifyToken.validateToken, seeker_validate.seekerUpdateEmployement, seekerController.update_byId)

module.exports = seekerRoutes








