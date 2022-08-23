const joinQueryRoute = require("express").Router()
const { joinqueryController } = require('../../controllers')
const { verifyToken } = require('../../middleware')

joinQueryRoute.get("/emploct", joinqueryController.emploct)
joinQueryRoute.get("/empedudetail", joinqueryController.empedudetail)
joinQueryRoute.get("/seeker_min_salary", joinqueryController.employee_min_salary)
joinQueryRoute.get("/seeker_get_all_details", verifyToken.validateToken, joinqueryController.emp_get_all_details)

joinQueryRoute.get("/get_all_specialization", joinqueryController.get_all_specialization)
joinQueryRoute.get("/employer_get_all_details", joinqueryController.emp_get_all_details)
joinQueryRoute.get("/course", joinqueryController.course)

module.exports = joinQueryRoute

