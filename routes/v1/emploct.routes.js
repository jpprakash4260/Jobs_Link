const EmploctRoute = require("express").Router()
const { emploct_validate } = require("../../validators")
const { emploctController } = require('../../controllers')

EmploctRoute.post("/", emploct_validate.create, emploctController.create)
EmploctRoute.get("/", emploctController.get)
EmploctRoute.get("/:emplocat_id", emploctController.getByPk)
EmploctRoute.post("/Details", emploctController.getCollegeDetails)
EmploctRoute.put("/:emplocat_id", emploct_validate.update, emploctController.update)
EmploctRoute.delete("/delete", emploctController.delete)

module.exports = EmploctRoute