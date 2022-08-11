const IndustrytypeRoute = require("express").Router()
const { industrytype_validate } = require("../../validators")
const { industrytypeController } = require('../../controllers')

IndustrytypeRoute.post("/", industrytype_validate.create, industrytypeController.create)
IndustrytypeRoute.get("/", industrytypeController.get)
IndustrytypeRoute.get("/:indust_id", industrytypeController.getByPk)
IndustrytypeRoute.post("/Details", industrytypeController.getCollegeDetails)
IndustrytypeRoute.put("/:indust_id", industrytype_validate.update, industrytypeController.update)
IndustrytypeRoute.delete("/delete", industrytypeController.delete)

module.exports = IndustrytypeRoute