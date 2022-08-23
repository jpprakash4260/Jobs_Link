const EmpjobcatRoute = require("express").Router()
const { empjobcat_validate } = require("../../validators")
const { verifyToken } = require('../../middleware')
const { empjobcatController } = require('../../controllers')

EmpjobcatRoute.post("/", verifyToken.validateToken, empjobcat_validate.create, empjobcatController.create)
EmpjobcatRoute.get("/", verifyToken.validateToken, empjobcatController.get)
EmpjobcatRoute.get("/:mjcat_id", verifyToken.validateToken, empjobcatController.getByPk)
EmpjobcatRoute.post("/Details", verifyToken.validateToken, empjobcatController.getCollegeDetails)
EmpjobcatRoute.put("/:mjcat_id", verifyToken.validateToken, empjobcat_validate.update, empjobcatController.update)
EmpjobcatRoute.delete("/delete", verifyToken.validateToken, empjobcatController.delete)

module.exports = EmpjobcatRoute