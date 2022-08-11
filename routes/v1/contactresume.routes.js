const contactresumeRoutes = require("express").Router()
const { contactresume_validate } = require("../../validators")
const { contactresumeController } = require('../../controllers')

contactresumeRoutes.post("/", contactresume_validate.create, contactresumeController.create)
contactresumeRoutes.get("/", contactresumeController.get)
contactresumeRoutes.get("/:cont_id", contactresumeController.getByPk)
contactresumeRoutes.post("/Details", contactresumeController.getCollegeDetails)
contactresumeRoutes.put("/:cont_id", contactresume_validate.update, contactresumeController.update)
contactresumeRoutes.delete("/delete", contactresumeController.delete)

module.exports = contactresumeRoutes