const SymposiumRoute = require("express").Router()
const { symposium_validate } = require("../../validators")
const { symposiumController } = require('../../controllers')

SymposiumRoute.post("/", symposium_validate.create, symposiumController.create)
SymposiumRoute.get("/", symposiumController.get)
SymposiumRoute.get("/:symp_id", symposiumController.getByPk)
SymposiumRoute.post("/Details", symposiumController.getCollegeDetails)
SymposiumRoute.put("/:symp_id", symposium_validate.update, symposiumController.update)
SymposiumRoute.delete("/delete", symposiumController.delete)

module.exports = SymposiumRoute