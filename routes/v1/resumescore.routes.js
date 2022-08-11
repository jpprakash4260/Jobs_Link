const ResumescoreRoute = require("express").Router()
const { resumescore_validate } = require("../../validators")
const { resumescoreController } = require('../../controllers')

ResumescoreRoute.post("/", resumescore_validate.create, resumescoreController.create)
ResumescoreRoute.get("/", resumescoreController.get)
ResumescoreRoute.get("/:resume_id", resumescoreController.getByPk)
ResumescoreRoute.post("/Details", resumescoreController.getCollegeDetails)
ResumescoreRoute.put("/:resume_id", resumescore_validate.update, resumescoreController.update)
ResumescoreRoute.delete("/delete", resumescoreController.delete)

module.exports = ResumescoreRoute