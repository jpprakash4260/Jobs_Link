'use strict'
var localStorage = require('local-storage')
const JWT = require("jsonwebtoken")
const { networkInterfaces } = require('os')
const db = require('../models')

class Helper { }

Helper.gen_otp = async () => {
   try {
      let generated_OTP = await Math.floor(100000 + Math.random() * 900000) + 1
      return generated_OTP
   }
   catch (err) {
      return err
   }
}

Helper.JWT_token = async (data) => {
   try {
      const Token = await JWT.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRESIN })
      return Token
   }
   catch (err) {
      return err
   }
}

Helper.setToLocalstorage = async (Token) => {
   try {
      const setToken = await localStorage.set('userToken', Token)
      return setToken
   } catch (err) {
      return err
   }
}

Helper.getToLocalstorage = async () => {
   try {
      const getToken = await localStorage.get('userToken')
      return getToken
   } catch (err) {
      return err
   }
}

Helper.get_IP = async () => {
   try {

      const nets = networkInterfaces()
      const results = Object.create(null)                     // Or just '{ }', an empty object

      for (const name of Object.keys(nets)) {

         for (const net of nets[name]) {                     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses

            if (net.family === 'IPv4' && !net.internal) {

               if (!results[name]) {
                  results[name] = []
               }
               results[name].push(net.address)

               return results.WiFi ? results.WiFi[0] : results
            }
         }
      }
   } catch (err) {
      return err
   }
}

Helper.Truncate = async (req , res) => {

   try {

      const tableName = req.params.tableName
      const Truncate = await db.sequelize.query(`TRUNCATE TABLE ${tableName}`)

      if (
         Truncate[0] &&
         Truncate[0].fieldCount == 0 &&
         Truncate[0].affectedRows == 0 &&
         Truncate[0].insertId == 0 &&
         Truncate[0].info == '' &&
         Truncate[0].serverStatus == 2 &&
         Truncate[0].warningStatus == 0
      ) {
         res.json(`Truncate table ${tableName} is Successfull`)
      }
      else {
         res.send(`Truncate Failure in ${ tableName }`)
      }
   }
   catch (err) {
      res.send(err)
   }
}

module.exports = Helper
