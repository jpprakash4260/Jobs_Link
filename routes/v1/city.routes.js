const CityRoute = require("express").Router()
const { city_validate } = require("../../validators")
const { cityController } = require('../../controllers')

CityRoute.post("/", city_validate.create, cityController.create)
CityRoute.get("/", cityController.get)
CityRoute.get("/:city_id", cityController.getByPk)
CityRoute.post("/Details", cityController.getAdminDetails)
CityRoute.put("/:city_id", city_validate.update, cityController.update)
CityRoute.delete("/delete", cityController.delete)

module.exports = CityRoute