const OperatorRoute = require("express").Router()
const { operator_validate } = require("../../validators")
const { operatorController } = require('../../controllers')

OperatorRoute.post("/", operator_validate.create, operatorController.create)
OperatorRoute.get("/", operatorController.get)
OperatorRoute.get("/:op_id", operatorController.getByPk)
OperatorRoute.post("/Details", operatorController.getCollegeDetails)
OperatorRoute.put("/:op_id", operator_validate.update, operatorController.update)
OperatorRoute.delete("/delete", operatorController.delete)

module.exports = OperatorRoute