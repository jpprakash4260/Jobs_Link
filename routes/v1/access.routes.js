const AccessRoute = require("express").Router()
const { access_validate } = require("../../validators")
const { accessKeyController } = require('../../controllers')

AccessRoute.post("/", access_validate.create, accessKeyController.create)
AccessRoute.get("/", accessKeyController.get)
AccessRoute.get("/:access_id", accessKeyController.getOneUser)
AccessRoute.post("/Details", accessKeyController.getAccessDetails)
AccessRoute.put("/:access_id", access_validate.update, accessKeyController.update)
AccessRoute.delete("/delete", accessKeyController.delete)

module.exports = AccessRoute