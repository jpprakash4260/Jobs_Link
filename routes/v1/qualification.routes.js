const QualificationRoute = require("express").Router()
const { qualification_validate } = require("../../validators")
const { qualificationController } = require('../../controllers')

QualificationRoute.post("/", qualification_validate.create, qualificationController.create)
QualificationRoute.get("/", qualificationController.get)
QualificationRoute.get("/:qual_id", qualificationController.getByPk)
QualificationRoute.post("/Details", qualificationController.getCollegeDetails)
QualificationRoute.put("/:qual_id", qualification_validate.update, qualificationController.update)
QualificationRoute.delete("/delete", qualificationController.delete)

module.exports = QualificationRoute