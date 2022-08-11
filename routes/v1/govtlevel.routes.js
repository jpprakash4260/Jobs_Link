const GovlevelRoute = require("express").Router()
const { govtlevel_validate } = require("../../validators")
const { govtlevelController } = require('../../controllers')

GovlevelRoute.post("/", govtlevel_validate.create, govtlevelController.create)
GovlevelRoute.get("/", govtlevelController.get)
GovlevelRoute.get("/:lev_id", govtlevelController.getByPk)
GovlevelRoute.post("/Details", govtlevelController.getCollegeDetails)
GovlevelRoute.put("/:lev_id", govtlevel_validate.update, govtlevelController.update)
GovlevelRoute.delete("/delete", govtlevelController.delete)

module.exports = GovlevelRoute