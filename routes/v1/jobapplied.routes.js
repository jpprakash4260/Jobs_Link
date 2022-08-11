const applied_idRoute = require("express").Router()
const { jobapplied_validate } = require("../../validators")
const { jobappliedController } = require('../../controllers')

applied_idRoute.post("/", jobapplied_validate.create, jobappliedController.create)
applied_idRoute.get("/", jobappliedController.get)
applied_idRoute.get("/:applied_id", jobappliedController.getByPk)
applied_idRoute.post("/Details", jobappliedController.getCollegeDetails)
applied_idRoute.put("/:applied_id", jobapplied_validate.update, jobappliedController.update)
applied_idRoute.delete("/delete", jobappliedController.delete)

module.exports = applied_idRoute