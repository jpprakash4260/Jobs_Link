const CampusRoute = require("express").Router()
const { campus_validate } = require("../../validators")
const { campusController } = require('../../controllers')

CampusRoute.post("/", campus_validate.create, campusController.create)
CampusRoute.get("/", campusController.get)
CampusRoute.get("/:camp_id", campusController.getByPk)
CampusRoute.post("/Details", campusController.getAdminDetails)
CampusRoute.put("/:camp_id", campus_validate.update, campusController.update)
CampusRoute.delete("/delete", campusController.delete)

module.exports = CampusRoute