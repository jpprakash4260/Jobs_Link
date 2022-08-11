const CourseRoute = require("express").Router()
const { course_validate } = require("../../validators")
const { courseController } = require('../../controllers')

CourseRoute.post("/", course_validate.create, courseController.create)
CourseRoute.get("/", courseController.get)
CourseRoute.get("/:course_id", courseController.getByPk)
CourseRoute.post("/Details", courseController.getCollegeDetails)
CourseRoute.put("/:colg_id", course_validate.update, courseController.update)
CourseRoute.delete("/delete", courseController.delete)

module.exports = CourseRoute