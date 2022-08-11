const JobpostingRoute = require("express").Router()
const { jobposting_validate } = require("../../validators")
const { jobpostingController } = require('../../controllers')

JobpostingRoute.post("/", jobposting_validate.create, jobpostingController.create)
JobpostingRoute.get("/", jobpostingController.get)
JobpostingRoute.get("/:job_id", jobpostingController.getByPk)
JobpostingRoute.post("/Details", jobpostingController.getCollegeDetails)
JobpostingRoute.put("/:job_id", jobposting_validate.update, jobpostingController.update)
JobpostingRoute.delete("/delete", jobpostingController.delete)

module.exports = JobpostingRoute