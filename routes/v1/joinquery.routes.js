const joinQueryRoute = require("express").Router()
const { joinqueryController } = require('../../controllers')

joinQueryRoute.get("/emploct", joinqueryController.emploct)
joinQueryRoute.get("/empedudetail", joinqueryController.empedudetail)

module.exports = joinQueryRoute

