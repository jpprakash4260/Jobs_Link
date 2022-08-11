const GovcategoryRoute = require("express").Router()
const { govcategory_validate } = require("../../validators")
const { govcategoryController } = require('../../controllers')

GovcategoryRoute.post("/", govcategory_validate.create, govcategoryController.create)
GovcategoryRoute.get("/", govcategoryController.get)
GovcategoryRoute.get("/:gcat_id", govcategoryController.getByPk)
GovcategoryRoute.post("/Details", govcategoryController.getCollegeDetails)
GovcategoryRoute.put("/:gcat_id", govcategory_validate.update, govcategoryController.update)
GovcategoryRoute.delete("/delete", govcategoryController.delete)

module.exports = GovcategoryRoute