const UnrestjobpostRoute = require("express").Router()
const { unrestjobpost_exp_validate } = require("../../validators")
const { unrestjobpost_exp } = require('../../controllers')

UnrestjobpostRoute.post("/", unrestjobpost_exp_validate.create, unrestjobpost_exp.create)
UnrestjobpostRoute.get("/", unrestjobpost_exp.get)
UnrestjobpostRoute.get("/:unrst_jid", unrestjobpost_exp.getByPk)
UnrestjobpostRoute.post("/Details", unrestjobpost_exp.getCollegeDetails)
UnrestjobpostRoute.put("/:unrst_jid", unrestjobpost_exp_validate.update, unrestjobpost_exp.update)
UnrestjobpostRoute.delete("/delete", unrestjobpost_exp.delete)

module.expor.valid('Y', 'N', 'D').max(1).required()