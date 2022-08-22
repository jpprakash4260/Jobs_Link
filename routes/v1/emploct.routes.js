const EmploctRoute = require("express").Router()
const { emploct_validate } = require("../../validators")
const { emploctController } = require('../../controllers')
const { verifyToken } = require('../../middleware')

EmploctRoute.post("/", verifyToken.validateToken , emploct_validate.create, emploctController.create)
EmploctRoute.get("/", verifyToken.validateToken ,emploctController.get)
EmploctRoute.get("/:emplocat_id", verifyToken.validateToken ,emploctController.getByPk)
EmploctRoute.post("/Details",verifyToken.validateToken , emploctController.getCollegeDetails)
EmploctRoute.put("/:emplocat_id",verifyToken.validateToken , emploct_validate.update, emploctController.update)
EmploctRoute.delete("/delete",verifyToken.validateToken , emploctController.delete)

module.exports = EmploctRoute