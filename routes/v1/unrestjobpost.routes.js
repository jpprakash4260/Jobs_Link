const UnrestjobpostRoute = require("express").Router()
const { unrestjobpost_validate } = require("../../validators")
const { unrestjobpost } = require('../../controllers')

UnrestjobpostRoute.post("/", unrestjobpost_validate.create, unrestjobpost.create)
UnrestjobpostRoute.get("/", unrestjobpost.get)
UnrestjobpostRoute.get("/:unrst_jid", unrestjobpost.getByPk)
UnrestjobpostRoute.post("/Details", unrestjobpost.getCollegeDetails)
UnrestjobpostRoute.put("/:unrst_jid", unrestjobpost_validate.update, unrestjobpost.update)
UnrestjobpostRoute.delete("/delete", unrestjobpost.delete)

module.exports = UnrestjobpostRoute