const EmpedudetailRoute = require("express").Router()
const { empedudetail_validate } = require("../../validators")
const { empedudetailController } = require('../../controllers')

EmpedudetailRoute.post("/", empedudetail_validate.create, empedudetailController.create)
EmpedudetailRoute.get("/", empedudetailController.get)
EmpedudetailRoute.get("/:edu_id", empedudetailController.getByPk)
EmpedudetailRoute.post("/Details", empedudetailController.getCollegeDetails)
EmpedudetailRoute.put("/:edu_id", empedudetail_validate.update, empedudetailController.update)
EmpedudetailRoute.delete("/delete", empedudetailController.delete)

module.exports = EmpedudetailRoute