const SeminarRoute = require("express").Router()
const { seminars_validate } = require("../../validators")
const { seminarsController } = require('../../controllers')

SeminarRoute.post("/", seminars_validate.create, seminarsController.create)
SeminarRoute.get("/", seminarsController.get)
SeminarRoute.get("/:semi_id", seminarsController.getByPk)
SeminarRoute.post("/Details", seminarsController.getCollegeDetails)
SeminarRoute.put("/:semi_id", seminars_validate.update, seminarsController.update)
SeminarRoute.delete("/delete", seminarsController.delete)

module.exports = SeminarRoute