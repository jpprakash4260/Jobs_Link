const Edu_courseRoute = require("express").Router()
const { edu_course_validate } = require("../../validators")
const { edu_courseController } = require('../../controllers')

Edu_courseRoute.post("/", edu_course_validate.create, edu_courseController.create)
Edu_courseRoute.get("/", edu_courseController.get)
Edu_courseRoute.get("/:ecat_id", edu_courseController.getByPk)
Edu_courseRoute.post("/Details", edu_courseController.getCollegeDetails)
Edu_courseRoute.put("/:ecat_id", edu_course_validate.update, edu_courseController.update)
Edu_courseRoute.delete("/delete", edu_courseController.delete)

module.exports = Edu_courseRoute