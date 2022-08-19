const express = require("express")
const seekerRoutes = express.Router()
const { seekerController } = require("../../controllers")
const { verifyToken } = require("../../middleware")
const { seeker_validate } = require("../../validators")
const upload = require('../../validators/multer')

// CRUD Routes

seekerRoutes.post("/", seeker_validate.create, seekerController.create)
seekerRoutes.get("/", seekerController.get)
seekerRoutes.get("/:emp_id", seekerController.getByPk)
seekerRoutes.post("/Details", seekerController.getCollegeDetails)
seekerRoutes.put("/:emp_id", seeker_validate.update, seekerController.update)
seekerRoutes.delete("/delete", seekerController.delete)


// OLD My Method Routes

seekerRoutes.get('/dashboard', verifyToken.validateToken, seekerController.dashboard)

module.exports = seekerRoutes








