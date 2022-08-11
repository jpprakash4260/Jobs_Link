const WorkshopsRoute = require("express").Router()
const { workshops_validate } = require("../../validators")
const { workshopsController } = require('../../controllers')

WorkshopsRoute.post("/", workshops_validate.create, workshopsController.create)
WorkshopsRoute.get("/", workshopsController.get)
WorkshopsRoute.get("/:work_id", workshopsController.getByPk)
WorkshopsRoute.post("/Details", workshopsController.getCollegeDetails)
WorkshopsRoute.put("/:work_id", workshops_validate.update, workshopsController.update)
WorkshopsRoute.delete("/delete", workshopsController.delete)

module.exports = WorkshopsRoute