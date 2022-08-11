const CollegeRoute = require("express").Router()
const { college_validate } = require("../../validators")
const { collegeController } = require('../../controllers')

CollegeRoute.post("/", college_validate.create, collegeController.create)
CollegeRoute.get("/", collegeController.get)
CollegeRoute.get("/:colg_id", collegeController.getByPk)
CollegeRoute.post("/Details", collegeController.getCollegeDetails)
CollegeRoute.put("/:colg_id", college_validate.update, collegeController.update)
CollegeRoute.delete("/delete", collegeController.delete)

module.exports = CollegeRoute