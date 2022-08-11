const CountryRoutes = require("express").Router()
const { country_validate } = require("../../validators")
const { countryController } = require('../../controllers')

CountryRoutes.post("/", country_validate.create, countryController.create)
CountryRoutes.get("/", countryController.get)
CountryRoutes.get("/:country_id", countryController.getByPk)
CountryRoutes.post("/Details", countryController.getCollegeDetails)
CountryRoutes.put("/:country_id", country_validate.update, countryController.update)
CountryRoutes.delete("/delete", countryController.delete)

module.exports = CountryRoutes