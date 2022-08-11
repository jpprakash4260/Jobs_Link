const ExperinceRoute = require("express").Router()
const { experince_validate } = require("../../validators")
const { experinceController } = require('../../controllers')

ExperinceRoute.post("/", experince_validate.create, experinceController.create)
ExperinceRoute.get("/", experinceController.get)
ExperinceRoute.get("/:exp_id", experinceController.getByPk)
ExperinceRoute.post("/Details", experinceController.getCollegeDetails)
ExperinceRoute.put("/:exp_id", experince_validate.update, experinceController.update)
ExperinceRoute.delete("/delete", experinceController.delete)

module.exports = ExperinceRoute