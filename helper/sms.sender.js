const logger = require("./logger")
const { loggerMessage} = require("../constants")
var unirest = require('unirest')
const smsconfig = require('../config/sms.config')


const SMS_Sender = async (to_mobile, mobile_otp) => {

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
               
               console.log("\nSMS Sented Successfully to   : ", to_mobile, '\n')
               logger.error(loggerMessage.SendingSMSSuccess)

            }
            else {
               logger.error(loggerMessage.SendingSMSFailure)
               console.log(result.body)
            }
         })
      }
      else {
         console.log('\nSMS Sender is : ', 'OFF')
      }
   }

   catch (error) {
      logger.error(loggerMessage.errorInSendingSMS)
   }
}

module.exports = SMS_Sender