const SalaryRoute = require("express").Router()
const { salary_validate } = require("../../validators")
const { salaryController } = require('../../controllers')

SalaryRoute.post("/", salary_validate.create, salaryController.create)
SalaryRoute.get("/", salaryController.get)
SalaryRoute.get("/:sal_id", salaryController.getByPk)
SalaryRoute.post("/Details", salaryController.getCollegeDetails)
SalaryRoute.put("/:sal_id", salary_validate.update, salaryController.update)
SalaryRoute.delete("/delete", salaryController.delete)

module.exports = SalaryRoute