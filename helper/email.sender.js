const nodemailer = require("nodemailer")
const logger = require("./logger")
const emailconfig = require("../config/email.config")
const { loggerMessage } = require("../constants")


const email_sender = async (to_email, email_otp, forgot_Password, message) => {
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

            logger.info(loggerMessage.SendingEmailSuccess)
            return sendMail.accepted[0]

         }
         else if (sendMail.rejected[0]) {
            
            console.log('Email sending Failure : ', sendMail.rejected[0])

            logger.error(loggerMessage.SendingEmailFailure)
            return "OTP Sending Failure"

         }
      }
      else {
         console.log("Email Sender is : ", "OFF\n")
      }
   }
   catch (err) {
      return err
   }
}

module.exports = email_sender