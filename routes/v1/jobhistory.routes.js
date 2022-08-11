const JobhistoryRoute = require("express").Router()
const { jobhistory_validate } = require("../../validators")
const { jobhistoryController } = require('../../controllers')

JobhistoryRoute.post("/", jobhistory_validate.create, jobhistoryController.create)
JobhistoryRoute.get("/", jobhistoryController.get)
JobhistoryRoute.get("/:id", jobhistoryController.getByPk)
JobhistoryRoute.post("/Details", jobhistoryController.getCollegeDetails)
JobhistoryRoute.put("/:id", jobhistory_validate.update, jobhistoryController.update)
JobhistoryRoute.delete("/delete", jobhistoryController.delete)

module.exports = JobhistoryRoute