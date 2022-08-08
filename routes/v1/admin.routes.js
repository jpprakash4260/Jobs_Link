const AdminRoute = require("express").Router()
const { admin_validate } = require("../../validators")
const { adminController } = require('../../controllers')

AdminRoute.post("/", admin_validate.create, adminController.create)
AdminRoute.get("/", adminController.get)
AdminRoute.get("/:access_id", adminController.getByPk)
AdminRoute.post("/Details", adminController.getAdminDetails)
AdminRoute.put("/:admin_id", admin_validate.update, adminController.update)
AdminRoute.delete("/delete", adminController.delete)

module.exports = AdminRoute