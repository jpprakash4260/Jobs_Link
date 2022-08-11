const AccessRoute = require("express").Router()
const { access_validate } = require("../../validators")
const { accessController } = require('../../controllers')

AccessRoute.post("/", access_validate.create, accessController.create)
AccessRoute.get("/", accessController.get)
AccessRoute.get("/:access_id", accessController.getByPk)
AccessRoute.post("/Details", accessController.getAccessDetails)
AccessRoute.put("/:access_id", access_validate.update, accessController.update)
AccessRoute.delete("/delete", accessController.delete)

module.exports = AccessRoute