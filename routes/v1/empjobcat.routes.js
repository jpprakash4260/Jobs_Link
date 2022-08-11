const EmpjobcatRoute = require("express").Router()
const { empjobcat_validate } = require("../../validators")
const { empjobcatController } = require('../../controllers')

EmpjobcatRoute.post("/", empjobcat_validate.create, empjobcatController.create)
EmpjobcatRoute.get("/", empjobcatController.get)
EmpjobcatRoute.get("/:mjcat_id", empjobcatController.getByPk)
EmpjobcatRoute.post("/Details", empjobcatController.getCollegeDetails)
EmpjobcatRoute.put("/:mjcat_id", empjobcat_validate.update, empjobcatController.update)
EmpjobcatRoute.delete("/delete", empjobcatController.delete)

module.exports = EmpjobcatRoute