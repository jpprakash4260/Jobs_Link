const JobpostingRoute = require("express").Router()
const { jobposting_validate } = require("../../validators")
const { jobpostingController } = require('../../controllers')
const { verifyToken } = require("../../middleware")

JobpostingRoute.post("/", verifyToken.validateToken, jobposting_validate.create, jobpostingController.create)
JobpostingRoute.get("/", verifyToken.validateToken, jobpostingController.get)
JobpostingRoute.get("/:job_id", verifyToken.validateToken, jobpostingController.getByPk)
JobpostingRoute.post("/Details", verifyToken.validateToken, jobpostingController.getCollegeDetails)
JobpostingRoute.put("/:job_id", verifyToken.validateToken, jobposting_validate.update, jobpostingController.update)
JobpostingRoute.delete("/delete", verifyToken.validateToken, jobpostingController.delete)

module.exports = JobpostingRoute