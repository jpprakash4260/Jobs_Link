const StateRoute = require("express").Router()
const { state_validate } = require("../../validators")
const { stateController } = require('../../controllers')

StateRoute.post("/", state_validate.create, stateController.create)
StateRoute.get("/", stateController.get)
StateRoute.get("/:state_id", stateController.getByPk)
StateRoute.post("/Details", stateController.getCollegeDetails)
StateRoute.put("/:state_id", state_validate.update, stateController.update)
StateRoute.delete("/delete", stateController.delete)

module.exports = StateRoute