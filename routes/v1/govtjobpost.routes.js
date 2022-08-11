const GovjobpostRoute = require("express").Router()
const { govtjobpost_validate } = require("../../validators")
const { govtjobpostController } = require('../../controllers')

GovjobpostRoute.post("/", govtjobpost_validate.create, govtjobpostController.create)
GovjobpostRoute.get("/", govtjobpostController.get)
GovjobpostRoute.get("/:unrst_jid", govtjobpostController.getByPk)
GovjobpostRoute.post("/Details", govtjobpostController.getCollegeDetails)
GovjobpostRoute.put("/:unrst_jid", govtjobpost_validate.update, govtjobpostController.update)
GovjobpostRoute.delete("/delete", govtjobpostController.delete)

module.exports = GovjobpostRoute