'use strict'

const db = require('../Models')
const { joinqueryService, qualificationService, courseService, specializationService, collegeService } = require('../services')
/*
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger } = require('../helper')
const { Op } = require('sequelize')
const createError = require('http-errors')
*/

class JoinQueryController { }

JoinQueryController.emploct = async (req, res) => {
   try {
      const emp_id = 236

      const [emploct] = await joinqueryService.emploct(emp_id)

      res.json(emploct)
   }
   catch (error) {
      res.json(error)
   }
}

JoinQueryController.empedudetail = async (req, res) => {
   try {
      const emp_id = 1

      const [empedudetail] = await joinqueryService.empedudetail(emp_id)

      res.json([empedudetail][0])
   }
   catch (error) {
      console.log(error)
      res.json(error)
   }
}

JoinQueryController.employee_min_salary = async (req, res) => {
   try {
      const emp_id = 1

      const [employee_min_salary] = await joinqueryService.employee_min_salary(emp_id)

      res.json(employee_min_salary)
   }
   catch (error) {
      res.json(error)
   }
}

JoinQueryController.emp_get_all_details = async (req, res) => {
   try {
      const emp_id = req.seeked_id

      const [emp_get_all_details] = await joinqueryService.emp_get_all_details(emp_id)

      res.json(emp_get_all_details)
   }
   catch (error) {
      res.json(error)
   }
}

JoinQueryController.get_all_specialization = async (req, res) => {
   try {
      const speclz_id = 1

      const [specialization] = await joinqueryService.get_all_specialization(speclz_id)

      res.json(specialization)
   }
   catch (error) {
      res.json(error)
   }
}


module.exports = JoinQueryController
