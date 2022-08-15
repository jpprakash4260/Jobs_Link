const KeyskillsRoute = require("express").Router()
const { keyskills_validate } = require("../../validators")
const { keyskillsController } = require('../../controllers')

KeyskillsRoute.post("/", keyskills_validate.create, keyskillsController.create)
KeyskillsRoute.get("/", keyskillsController.get)
KeyskillsRoute.get("/:keysk_id", keyskillsController.getByPk)
KeyskillsRoute.post("/Details", keyskillsController.getCollegeDetails)
KeyskillsRoute.put("/:keysk_id", keyskills_validate.update, keyskillsController.update)
KeyskillsRoute.delete("/delete", keyskillsController.delete)

module.exports = KeyskillsRoute



