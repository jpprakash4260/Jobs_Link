const IntscheduleRoute = require("express").Router()
const { intschedule_validate } = require("../../validators")
const { intscheduleController } = require('../../controllers')

IntscheduleRoute.post("/", intschedule_validate.create, intscheduleController.create)
IntscheduleRoute.get("/", intscheduleController.get)
IntscheduleRoute.get("/:intsch_id", intscheduleController.getByPk)
IntscheduleRoute.post("/Details", intscheduleController.getCollegeDetails)
IntscheduleRoute.put("/:intsch_id", intschedule_validate.update, intscheduleController.update)
IntscheduleRoute.delete("/delete", intscheduleController.delete)

module.exports = IntscheduleRoute