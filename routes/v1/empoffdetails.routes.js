const EmpofficialDetailRoute = require("express").Router()
const { empoffdetails_validate } = require("../../validators")
const { empoffdetailsController } = require('../../controllers')

EmpofficialDetailRoute.post("/", empoffdetails_validate.create, empoffdetailsController.create)
EmpofficialDetailRoute.get("/", empoffdetailsController.get)
EmpofficialDetailRoute.get("/:wrk_id", empoffdetailsController.getByPk)
EmpofficialDetailRoute.post("/Details", empoffdetailsController.getCollegeDetails)
EmpofficialDetailRoute.put("/:wrk_id", empoffdetails_validate.update, empoffdetailsController.update)
EmpofficialDetailRoute.delete("/delete", empoffdetailsController.delete)

module.exports = EmpofficialDetailRoute