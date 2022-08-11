const SpecializationRoute = require("express").Router()
const { specialization_validate } = require("../../validators")
const { specializationController } = require('../../controllers')

SpecializationRoute.post("/", specialization_validate.create, specializationController.create)
SpecializationRoute.get("/", specializationController.get)
SpecializationRoute.get("/:speclz_id", specializationController.getByPk)
SpecializationRoute.post("/Details", specializationController.getCollegeDetails)
SpecializationRoute.put("/:speclz_id", specialization_validate.update, specializationController.update)
SpecializationRoute.delete("/delete", specializationController.delete)

module.exports = SpecializationRoute