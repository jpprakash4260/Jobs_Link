const AdminMenuRoute = require("express").Router()
const { adminMenu_validate } = require("../../validators")
const { adminMenuController } = require('../../controllers')

AdminMenuRoute.post("/", adminMenu_validate.create, adminMenuController.create)
AdminMenuRoute.get("/", adminMenuController.get)
AdminMenuRoute.get("/:menu_id", adminMenuController.getByPk)
AdminMenuRoute.post("/Details", adminMenuController.getAdminDetails)
AdminMenuRoute.put("/:menu_id", adminMenu_validate.update, adminMenuController.update)
AdminMenuRoute.delete("/delete", adminMenuController.delete)

module.exports = AdminMenuRoute