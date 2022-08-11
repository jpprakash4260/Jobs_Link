const Govjobpost_expRoute = require("express").Router()
const { govtjobpost_exp_validate } = require("../../validators")
const { govtjobpost_expController } = require('../../controllers')

Govjobpost_expRoute.post("/", govtjobpost_exp_validate.create, govtjobpost_expController.create)
Govjobpost_expRoute.get("/", govtjobpost_expController.get)
Govjobpost_expRoute.get("/:unrst_jid", govtjobpost_expController.getByPk)
Govjobpost_expRoute.post("/Details", govtjobpost_expController.getCollegeDetails)
Govjobpost_expRoute.put("/:unrst_jid", govtjobpost_exp_validate.update, govtjobpost_expController.update)
Govjobpost_expRoute.delete("/delete", govtjobpost_expController.delete)

module.exports = Govjobpost_expRoute