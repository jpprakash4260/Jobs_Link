'use strict'
var localStorage = require('local-storage')
const nodemailer = require("nodemailer")
const JWT = require("jsonwebtoken")
var unirest = require("unirest")
const smsconfig = require("../config/sms.config")
const emailconfig = require("../config/email.config")
const { networkInterfaces } = require('os')


class HelperService { }

HelperService.gen_otp = async () => {
   try {
      let generated_OTP = await Math.floor(100000 + Math.random() * 900000) + 1
      return generated_OTP
   } catch (err) {
      return err
   }
}

HelperService.JWT_token = async (data) => {
   try {
      const Token = await JWT.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRESIN })
      return Token
   } catch (err) {
      return err
   }
}

HelperService.email_sender = async (to_email, email_otp, forgot_Password, message) => {
   try {

      var Email_Status = process.env.EMAIL_SENDER_STATUS

      if (Email_Status == 'ON') {

         const transporter = await nodemailer.createTransport({

            service: "gmail",
            auth: {
               user: emailconfig.email,
               pass: emailconfig.password,
            }
         })

         var subject = ''
         var html = ''

         if (email_otp) {

            subject = `Email Verification from Jobs-Link`
            html = `<p><b>${email_otp}</b></p>` + `<p>is your One Time Password</p>`

         }
         else if (forgot_Password) {

            subject = `forgoted Password from Jobs-Link`
            html = `
         <p><b>Dear ${forgot_Password.user_name},</b></p><br>
         Your forgoted password is given Below: <br><br><br>
         Username :  <b>  ${forgot_Password.mail_id}</b><br><br> 
         Password :  <b>  ${forgot_Password.password}</b><br><br> 
         Use this password to Login <br>
         Don't share this password to Anyone
         `
         }
         else {
            subject = `some subject`
            html = `<p><b>${message},</b></p>`
         }

         const mailOptions = {
            from: emailconfig.user,
            to: to_email,
            subject: subject,
            html: html,
         }

         let sendMail = await transporter.sendMail(mailOptions)

         if (sendMail.accepted[0]) {
            console.log("\nEmail Sented Successfully to : ", to_email, '\n')
            return sendMail.accepted[0]
         }
         else if (sendMail.rejected[0]) {
            console.log('Email sending Failure : ', sendMail.rejected[0])
            return "OTP Sending Failure"
         }
      }

      else {
         console.log("Email Sender is : ", "OFF")
   }
   }
   catch (err) {
      return err
   }
}

HelperService.sms_sender = async (to_mobile, mobile_otp, message) => {
   try {

      var SMS_Staus = process.env.SMS_SENDER_STATUS

      if (SMS_Staus == 'ON') {

         var req = unirest("POST", smsconfig.SMS_URL)

         req.headers({ "authorization": smsconfig.SMS_API_KEY })

         req.form({ "variables_values": mobile_otp, "route": "otp", "numbers": to_mobile })

         req.end((result) => {

            if (result.error) {
               throw new Error(result.error)
            }
            else if (result.body.return == true && result.body.request_id && result.body.message[0] == 'SMS sent successfully.') {
               console.log("\nSMS Sented Successfully to   : ", to_mobile)
            }
            else { console.log(result.body) }
         })
      }
      else {
         console.log('SMS Sender is : ', 'OFF' )
      }
   }
   catch (err) {
      return err
   }
}

HelperService.setToLocalstorage = async (Token) => {
   try {
      const setToken = await localStorage.set('userToken', Token)
      return setToken
   } catch (err) {
      return err
   }
}

HelperService.getToLocalstorage = async (Token) => {
   try {
      const getToken = await localStorage.get('userToken')
      return getToken
   } catch (err) {
      return err
   }
}

HelperService.get_IP = async () => {
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

module.exports = HelperService
