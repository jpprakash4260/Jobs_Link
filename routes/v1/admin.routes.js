const express = require("express")
const adminRoutes = express.Router()
const { adminController } = require("../../controllers")
// const { verifyToken } = require("../../middleware");
// const { admin_validate } = require("../../validators");

adminRoutes.post('/create', adminController.createAdmin)
adminRoutes.post('/findAllandCount', adminController.findAllandCount)
adminRoutes.get('/findOne', adminController.findOne)
adminRoutes.get('/findByPk/:id', adminController.findByPk)
adminRoutes.put('/updateById/:id', adminController.updateById)
adminRoutes.put('/updateStatus', adminController.updateStatus)
adminRoutes.delete('/delete/:id', adminController.delete)

module.exports = adminRoutes