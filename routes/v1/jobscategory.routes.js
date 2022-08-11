const JobscategoryRoute = require("express").Router()
const { jobcategory_validate } = require("../../validators")
const { jobscategoryController } = require('../../controllers')

JobscategoryRoute.post("/", jobcategory_validate.create, jobscategoryController.create)
JobscategoryRoute.get("/", jobscategoryController.get)
JobscategoryRoute.get("/:jcat_id", jobscategoryController.getByPk)
JobscategoryRoute.post("/Details", jobscategoryController.getCollegeDetails)
JobscategoryRoute.put("/:jcat_id", jobcategory_validate.update, jobscategoryController.update)
JobscategoryRoute.delete("/delete", jobscategoryController.delete)

module.exports = JobscategoryRoute