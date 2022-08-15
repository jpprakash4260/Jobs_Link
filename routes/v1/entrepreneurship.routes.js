const EntrepreneurshipRoute = require("express").Router()
const { entrepreneurship_validate } = require("../../validators")
const { entrepreneurshipController } = require('../../controllers')

EntrepreneurshipRoute.post("/", entrepreneurship_validate.create, entrepreneurshipController.create)
EntrepreneurshipRoute.get("/", entrepreneurshipController.get)
EntrepreneurshipRoute.get("/:ent_id", entrepreneurshipController.getByPk)
EntrepreneurshipRoute.post("/Details", entrepreneurshipController.getCollegeDetails)
EntrepreneurshipRoute.put("/:ent_id", entrepreneurship_validate.update, entrepreneurshipController.update)
EntrepreneurshipRoute.delete("/delete", entrepreneurshipController.delete)

module.exports = EntrepreneurshipRoute


