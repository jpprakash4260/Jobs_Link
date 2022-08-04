const express = require("express")
const adminMenuRoutes = express.Router()
const { adminMenuController } = require("../../controllers")
// const { verifyToken } = require("../../middleware");
// const { admin_validate } = require("../../validators");

adminMenuRoutes.post('/create', adminMenuController.createAdminMenu)
adminMenuRoutes.post('/findAllandCount', adminMenuController.findAllandCount)
adminMenuRoutes.get('/findOne', adminMenuController.findOne)
adminMenuRoutes.get('/findByPk/:id', adminMenuController.findByPk)
adminMenuRoutes.put('/updateById/:id', adminMenuController.updateById)
adminMenuRoutes.put('/updateStatus', adminMenuController.updateStatus)
adminMenuRoutes.delete('/delete/:id', adminMenuController.delete)

module.exports = adminMenuRoutes