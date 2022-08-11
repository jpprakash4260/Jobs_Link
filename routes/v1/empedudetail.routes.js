const EmpedudetailRoute = require("express").Router()
const { edu_course_validate } = require("../../validators")
const { edu_courseController } = require('../../controllers')

EmpedudetailRoute.post("/", edu_course_validate.create, edu_courseController.create)
EmpedudetailRoute.get("/", edu_courseController.get)
EmpedudetailRoute.get("/:edu_id", edu_courseController.getByPk)
EmpedudetailRoute.post("/Details", edu_courseController.getCollegeDetails)
EmpedudetailRoute.put("/:edu_id", edu_course_validate.update, edu_courseController.update)
EmpedudetailRoute.delete("/delete", edu_courseController.delete)

module.exports = EmpedudetailRoute