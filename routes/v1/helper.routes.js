const HelperRoute = require("express").Router()
const { helper } = require('../../helper')

HelperRoute.get("/truncate/:tableName", helper.Truncate)

module.exports = HelperRoute