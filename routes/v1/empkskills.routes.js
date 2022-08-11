const EmpkskilssRoute = require("express").Router()
const { empkskills_validate } = require("../../validators")
const { empkskillsController } = require('../../controllers')

EmpkskilssRoute.post("/", empkskills_validate.create, empkskillsController.create)
EmpkskilssRoute.get("/", empkskillsController.get)
EmpkskilssRoute.get("/:empkskil_id", empkskillsController.getByPk)
EmpkskilssRoute.post("/Details", empkskillsController.getCollegeDetails)
EmpkskilssRoute.put("/:empkskil_id", empkskills_validate.update, empkskillsController.update)
EmpkskilssRoute.delete("/delete", empkskillsController.delete)

module.exports = EmpkskilssRoute