const GovjobnewsRoute = require("express").Router()
const { govjobnews_validate } = require("../../validators")
const { govjobnewsController } = require('../../controllers')

GovjobnewsRoute.post("/", govjobnews_validate.create, govjobnewsController.create)
GovjobnewsRoute.get("/", govjobnewsController.get)
GovjobnewsRoute.get("/:gnews_id", govjobnewsController.getByPk)
GovjobnewsRoute.post("/Details", govjobnewsController.getCollegeDetails)
GovjobnewsRoute.put("/:gnews_id", govjobnews_validate.update, govjobnewsController.update)
GovjobnewsRoute.delete("/delete", govjobnewsController.delete)

module.exports = GovjobnewsRoute