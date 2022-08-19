'use strict'

const { joinqueryService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')

class JoinQueryController { }

JoinQueryController.emploct = async (req, res) => {
   try {

      var emp_id = 236

      const [joinQuery] = await joinqueryService.emploct(emp_id)

      res.json(joinQuery)
   }
   catch (error) {
      return error
   }

}

JoinQueryController.empedudetail = async (req, res) => {
   try {

      var emp_id = 236

      const [joinQuery] = await joinqueryService.empedudetail(emp_id)

      res.json(joinQuery)
   }
   catch (error) {
      return error
   }

}

module.exports = JoinQueryController
