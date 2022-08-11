const GcmregisterRoute = require("express").Router()
const { gcmregister_validate } = require("../../validators")
const { gcmregisterController } = require('../../controllers')

GcmregisterRoute.post("/", gcmregister_validate.create, gcmregisterController.create)
GcmregisterRoute.get("/", gcmregisterController.get)
GcmregisterRoute.get("/:id", gcmregisterController.getByPk)
GcmregisterRoute.post("/Details", gcmregisterController.getCollegeDetails)
GcmregisterRoute.put("/:id", gcmregister_validate.update, gcmregisterController.update)
GcmregisterRoute.delete("/delete", gcmregisterController.delete)

module.exports = GcmregisterRoute