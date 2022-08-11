const JobtypeRoute = require("express").Router()
const { jobtype_validate } = require("../../validators")
const { jobtypeController } = require('../../controllers')

JobtypeRoute.post("/", jobtype_validate.create, jobtypeController.create)
JobtypeRoute.get("/", jobtypeController.get)
JobtypeRoute.get("/:jtype_id", jobtypeController.getByPk)
JobtypeRoute.post("/Details", jobtypeController.getCollegeDetails)
JobtypeRoute.put("/:jtype_id", jobtype_validate.update, jobtypeController.update)
JobtypeRoute.delete("/delete", jobtypeController.delete)

module.exports = JobtypeRoute