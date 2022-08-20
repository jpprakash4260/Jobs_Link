'use strict'
const {  seekerService, employerService } = require('../services')
const { response } = require('../middleware')
const { statusCodes, responseMessage, loggerMessage } = require('../constants')
const { logger, SMS_Sender, helper, Email_Sender } = require('../helper')
const upload = require("../validators/cloudinary.validator")

class Login_Register_Controller { }

Login_Register_Controller.register = async (req, res) => {
   try {

      const exited_email = await seekerService.exited_email(req)
      const exited_mobile = await seekerService.exited_mobile(req)

      if (!exited_email && !exited_mobile) {

         var temp_email = await seekerService.temp_email(req)
         var temp_mobile = await seekerService.temp_mobile(req)

      }

      if ((!exited_email) && (!exited_mobile) && (!temp_email) && (!temp_mobile)) {  // new User

         await newSeeker(req, res)

      }
      else if (exited_email && exited_mobile) {

         if (exited_email.emp_id == exited_mobile.emp_id) {  // already Exited Account
            logger.info(loggerMessage.ext_Account)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.emp_email, responseMessage.ext_account)
         }
         else {
            logger.info(loggerMessage.ext_email_mobile)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.emp_email, responseMessage.ext_email_mobile)
         }
      }
      else if ((exited_email && !exited_mobile) || (!exited_email && exited_mobile)) {

         if (exited_email) {                 // already Exited email

            logger.info(loggerMessage.ext_email)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.emp_email, responseMessage.ext_email)
         }
         else {                                                // already Exited mobile

            logger.info(loggerMessage.ext_mobile)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.emp_mobile, responseMessage.ext_mobile)
         }
      }

      else if (temp_email && temp_mobile) {                // Non Verifed Account

         if (temp_email.emp_id == temp_mobile.emp_id) {   // OTP resended for non Verifed Account

            await Login_Register_Controller.resendOTP(req, res, temp_email)
         }
         else {                                           // deleting non Verifed Account and Create new Account

            const deleted_Mobile = await seekerService.deleteByMobile(temp_mobile)
            const deleted_Email = await seekerService.deleteByEmail(temp_email)

            if (deleted_Mobile == 1 && deleted_Email == 1) {
               await newSeeker(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
      }
      else if (((!temp_email) && temp_mobile) || (temp_email && (!temp_mobile))) {   // Non Verifed Account with exited Mobile or Email

         if ((!temp_email) && temp_mobile) {                                         // Non Verifed Account with exited Mobile

            const deleted = await seekerService.deleteByMobile(temp_mobile)

            if (deleted) {
               await newSeeker(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
         else if (temp_email && (!temp_mobile)) {                                    // Non Verifed Account with exited Email

            const deleted = await seekerService.deleteByEmail(temp_email)

            if (deleted) {
               await newSeeker(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
      } else {

         logger.error(loggerMessage.notCreated)
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.notCreated)

      }

      async function newSeeker(req, res) {                                           // Creating New Account

         const email_OTP = await helper.gen_otp()
         const mobile_OTP = await helper.gen_otp()

         var resume = 'not Attached'

         if (req.file) if (req.file.path) resume = (await upload.uploader.upload(req.file.path)).secure_url

         const seeker = {
            emp_name: req.body.emp_name,
            emp_email: req.body.emp_email,
            emp_pass: req.body.emp_pass,
            emp_mobile: req.body.emp_mobile,
            emp_country: req.body.emp_country,
            emp_state: req.body.emp_state,
            emp_city: req.body.emp_city,
            emp_resume: resume,
            agreechk: req.body.agreechk,
            mobile_otp: mobile_OTP,
            email_otp: email_OTP,
            emp_date: new Date(),
            ipaddress: await helper.get_IP()
         }

         const created = await seekerService.create(seeker)

         if (created) {

            SMS_Sender(req.body.emp_mobile, mobile_OTP)            // SMS OTP Sending

            Email_Sender(req.body.emp_email, email_OTP)            // Email OTP Sending

            var created_obj = {
               emp_id: created.emp_id,
               emp_email: created.emp_email,
               emp_mobile: created.emp_mobile,
               email_otp: created.email_otp,
               mobile_otp: created.mobile_otp              
            }

            logger.info(loggerMessage.otpSended)
            return response.success(req, res, statusCodes.HTTP_CREATED, created_obj, responseMessage.otpSended)
         }
         else {
            logger.error(loggerMessage.notCreated)
            return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, created, responseMessage.notCreated)
         }
      }
   }
   catch (err) {
      console.log("err in catch : ", err)
      logger.error(loggerMessage.errInCreate)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate)
   }
}

Login_Register_Controller.resendOTP = async (req, res, temp_email) => {
   try {

      const email_OTP = await helper.gen_otp()
      const mobile_OTP = await helper.gen_otp()

      const update_OTP = await seekerService.update_OTP(temp_email.emp_id, email_OTP, mobile_OTP)   // Update OTP in Seeker

      if (update_OTP == 1) {

         SMS_Sender(req.body.emp_mobile, mobile_OTP)                      // SMS OTP Sending

         Email_Sender(req.body.emp_email, email_OTP)                      // Email OTP Sending

         var created_obj = {
            emp_id: temp_email.emp_id,
            emp_email: temp_email.emp_email,
            emp_mobile: temp_email.emp_mobile,
            email_otp: email_OTP,
            mobile_otp: mobile_OTP
         }

         logger.info(loggerMessage.otpResended)
         return response.success(req, res, statusCodes.HTTP_OK, created_obj, responseMessage.otpResended)
      }
      else {
         logger.error(loggerMessage.updateDataFailure)
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, update_OTP, responseMessage.otpNotUpdated)
      }
   }
   catch (err) {
      console.log(err)
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating)
   }
}

Login_Register_Controller.Verify_Email = async (req, res) => {
   try {

      const verified_email = await seekerService.exited_email(req)
      const temp_email = await seekerService.temp_email(req)

      if (verified_email && !temp_email) {

         logger.warn(loggerMessage.alreadyVerified)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, verified_email.emp_email, responseMessage.alreadyVerified)
      }
      else if (temp_email && (!verified_email)) {

         if (temp_email.email_otp == req.body.email_otp) {

            const Verified = await seekerService.Verified_Email(temp_email.emp_id)

            if (Verified == 1) {
               logger.info(loggerMessage.Verified)
               return response.success(req, res, statusCodes.HTTP_OK, temp_email.emp_email, responseMessage.Verified)
            }
            else {
               logger.error(loggerMessage.updateDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.emp_email, responseMessage.registerFailure)
            }
         } else {
            logger.warn(loggerMessage.invalidOTP)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP)
         }
      } else {
         logger.warn(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.notFound)
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest)
   }
}

Login_Register_Controller.Verify_Mobile = async (req, res) => {
   try {

      const Verified_Mobile = await seekerService.exited_mobile(req)
      var temp_mobile = await seekerService.temp_mobile(req)

      if ((!temp_mobile) && Verified_Mobile) {

         logger.warn(loggerMessage.alreadyVerified)
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, Verified_Mobile.emp_email, responseMessage.alreadyVerified)

      }
      else if (temp_mobile && (!Verified_Mobile)) {

         if (temp_mobile.mobile_otp == req.body.mobile_otp) {

            const Verified = await seekerService.Verified_Mobile(temp_mobile.emp_id)

            if (Verified == 1) {
               logger.info(loggerMessage.Verified)
               return response.success(req, res, statusCodes.HTTP_OK, temp_mobile.emp_mobile, responseMessage.Verified)
            }
            else {
               logger.error(loggerMessage.updateDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_mobile.emp_mobile, responseMessage.registerFailure)
            }
         } else {
            logger.warn(loggerMessage.invalidOTP)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, temp_mobile, responseMessage.invalidOTP)
         }
      } else {
         logger.warn(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_mobile, responseMessage.notFound)
      }
   } catch (err) {
      console.log("err in catch : ",err)
      logger.error(loggerMessage.verificationFail)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest)
   }
}

Login_Register_Controller.add_education = async (req, res) => {
   try {

      const update = await seekerService.update(req.seeker_id, req.body)

      if (update == 1) {
         logger.info(loggerMessage.updateDataSuccess)
         return response.success(req, res, statusCodes.HTTP_OK, founded, responseMessage.updateDataSuccess)
      }
      else if (update == 'Exited Values') {
         logger.warn(loggerMessage.alreadyExited)
         return response.success(req, res, statusCodes.HTTP_ALREADY_REPORTED, update, responseMessage.alreadyExited)
      }
      else if (update == 'Seeker Not Found') {
         logger.error(loggerMessage.notFound)
         return response.success(req, res, statusCodes.HTTP_NOT_FOUND, update, responseMessage.notFound)
      }
      else if (update == 0) {
         logger.error(loggerMessage.notUpdated)
         return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, update, responseMessage.notUpdated)
      }
      else {
         logger.error(loggerMessage.updateDataFailure)
         return response.success(req, res, statusCodes.HTTP_EXPECTATION_FAILED, update, responseMessage.updateDataFailure)
      }
   }
   catch (err) {
      logger.error(loggerMessage.updateDataFailure)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating)
   }
}

Login_Register_Controller.login = async (req, res) => {
   try {

      const exited_email = await seekerService.exited_email(req)

      if (exited_email) {

         if (exited_email.comp_pass == req.body.comp_pass) {

            const Token = await helper.JWT_token( { email: exited_email.emp_email } )

            logger.info(loggerMessage.loginSuccess)
            return response.success(req, res, statusCodes.HTTP_OK, Token, responseMessage.loginSuccess)
         }
         else {
            logger.warn(loggerMessage.passwordIncorrect)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, req.body.password, responseMessage.passwordIncorrect)
         }
      }
      else {
         logger.error(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, exited_email, responseMessage.notFound)
      }
   }
   catch (err) {
      logger.error(loggerMessage.unauthorized)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.loginFailure)
   }
}

Login_Register_Controller.forgot_Password = async (req, res) => {
   try {

      const exited_email = await seekerService.exited_email(req)

      if (exited_email) {

         const forgot_Password = {
            user_name: exited_email.emp_name,
            mail_id: exited_email.emp_email,
            password: exited_email.password
         }

         Email_Sender(exited_email.emp_email, null, forgot_Password)  // Sending Password through UserName and  Email

         logger.info(loggerMessage.passwordsended)
         return response.success(req, res, statusCodes.HTTP_ACCEPTED, exited_email.emp_email, responseMessage.passwordsended)
      }
      else {
         logger.warn(loggerMessage.userNotFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, exited_email, responseMessage.userNotFound)
      }
   }
   catch (err) {
      logger.warn(loggerMessage.errorInFindOne)
      return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, err, responseMessage.notFound)
   }
}

Login_Register_Controller.employer_register = async (req, res) => {


   try {

      const exited_email = await employerService.exited_email(req)
      const exited_mobile = await employerService.exited_mobile(req)

      if (!exited_email && !exited_mobile) {

         var temp_email = await employerService.temp_email(req)
         var temp_mobile = await employerService.temp_mobile(req)

      }

      if ((!exited_email) && (!exited_mobile) && (!temp_email) && (!temp_mobile)) {  // new User

         await newEmployer(req, res)

      }
      else if (exited_email && exited_mobile) {

         if (exited_email.recut_id == exited_mobile.recut_id) {  // already Exited Account
            logger.info(loggerMessage.ext_Account)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.mail_id, responseMessage.ext_account)
         }
         else {
            logger.info(loggerMessage.ext_email_mobile)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.mail_id, responseMessage.ext_email_mobile)
         }
      }
      else if ((exited_email && !exited_mobile) || (!exited_email && exited_mobile)) {

         if (exited_email) {                 // already Exited email

            logger.info(loggerMessage.ext_email)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.mail_id, responseMessage.ext_email)
         }
         else {                                                // already Exited mobile
            logger.info(loggerMessage.ext_mobile)
            return response.success(req, res, statusCodes.HTTP_CONFLICT, exited_email.mobile_no, responseMessage.ext_mobile)
         }
      }

      else if (temp_email && temp_mobile) {                // Non Verifed Account

         if (temp_email.recut_id == temp_mobile.recut_id) {   // OTP resended for non Verifed Account

            await Login_Register_Controller.employer_resendOTP(req, res, temp_email)
         }
         else {                                           // deleting non Verifed Account and Create new Account

            const deleted_Mobile = await employerService.deleteByMobile(temp_mobile)
            const deleted_Email = await employerService.deleteByEmail(temp_email)

            if (deleted_Mobile == 1 && deleted_Email == 1) {
               await newEmployer(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
      }
      else if (((!temp_email) && temp_mobile) || (temp_email && (!temp_mobile))) {   // Non Verifed Account with exited Mobile or Email

         if ((!temp_email) && temp_mobile) {                                         // Non Verifed Account with exited Mobile

            const deleted = await employerService.deleteByMobile(temp_mobile)

            if (deleted) {
               await newEmployer(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
         else if (temp_email && (!temp_mobile)) {                                    // Non Verifed Account with exited Email

            const deleted = await employerService.deleteByEmail(temp_email)

            if (deleted) {
               await newEmployer(req, res)
            }
            else {
               logger.warn(loggerMessage.deleteDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted)
            }
         }
      } else {

         logger.error(loggerMessage.notCreated)
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.notCreated)

      }

      async function newEmployer(req, res) {                                           // Creating New Account

         const email_OTP = await helper.gen_otp()
         const mobile_OTP = await helper.gen_otp()

         const employer = {
            comp_name: req.body.comp_name,
            mail_id: req.body.mail_id,
            mobile_no: req.body.mobile_no,
            cont_person: req.body.cont_person,
            indust_id: req.body.indust_id,
            comp_pass: req.body.comp_pass,
            pincode: req.body.pincode,
            country_id: req.body.country_id,
            state_id: req.body.state_id,
            unrest_jloct: req.body.unrest_jloct,
            recut_address: req.body.recut_address,
            recut_desc: req.body.recut_desc,
            email_otp: email_OTP,
            mobile_otp: mobile_OTP,
            ipaddress: await helper.get_IP()
         }

         const created = await employerService.create(employer)

         if (created) {

            SMS_Sender(req.body.mobile_no, mobile_OTP)            // SMS OTP Sending

            Email_Sender(req.body.mail_id, email_OTP)            // Email OTP Sending

            var created_obj = {
               emp_id: created.recut_id,
               emp_email: created.mail_id,
               emp_mobile: created.mobile_no,
               email_otp: created.email_otp,
               mobile_otp: created.mobile_otp              
            }

            logger.info(loggerMessage.otpSended)
            return response.success(req, res, statusCodes.HTTP_CREATED, created_obj, responseMessage.otpSended)
         }
         else {
            logger.error(loggerMessage.notCreated)
            return response.success(req, res, statusCodes.HTTP_NOT_IMPLEMENTED, created, responseMessage.notCreated)
         }
      }
   }   
   catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errInCreate);
   }
}

Login_Register_Controller.employer_resendOTP = async (req, res, temp_email) => {
   try {

      const email_OTP = await helper.gen_otp()
      const mobile_OTP = await helper.gen_otp()

      const update_OTP = await employerService.update_OTP(temp_email.recut_id, email_OTP, mobile_OTP)   // Update OTP in Seeker

      if (update_OTP == 1) {

         SMS_Sender(req.body.mobile_no, mobile_OTP)

         Email_Sender(req.body.mail_id, email_OTP)

         var created_obj = {
            recut_id: temp_email.recut_id,
            mail_id: temp_email.mail_id,
            mobile_no: temp_email.mobile_no,
            email_otp: email_OTP,
            mobile_otp: mobile_OTP
         }

         logger.info(loggerMessage.otpResended)
         return response.success(req, res, statusCodes.HTTP_OK, created_obj, responseMessage.otpResended)
      }
      else {
         logger.error(loggerMessage.updateDataFailure)
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, update_OTP, responseMessage.otpNotUpdated)
      }
   }
   catch (err) {
      logger.error(loggerMessage.errorInUpdating)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating)
   }
}

Login_Register_Controller.employer_Verify_Email = async (req, res) => {

      try {

         const verified_email = await employerService.exited_email(req)
         const temp_email = await employerService.temp_email(req)

         if (verified_email && !temp_email) {

            logger.warn(loggerMessage.alreadyVerified)
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, verified_email.mail_id, responseMessage.alreadyVerified)
         }
         else if (temp_email && (!verified_email)) {

            if (temp_email.email_otp == req.body.email_otp) {

               const Verified = await employerService.Verified_Email(temp_email.recut_id)

               if (Verified == 1) {
                  logger.info(loggerMessage.Verified)
                  return response.success(req, res, statusCodes.HTTP_OK, temp_email.mail_id, responseMessage.Verified)
               }
               else {
                  logger.error(loggerMessage.updateDataFailure)
                  return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.mail_id, responseMessage.registerFailure)
               }
            } else {
               logger.warn(loggerMessage.invalidOTP)
               return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP)
            }
         } else {
            logger.warn(loggerMessage.notFound)
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.notFound)
         }
      } catch (err) {
         logger.error(loggerMessage.verificationFail)
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest)
      }
}

Login_Register_Controller.employer_Verify_Mobile = async (req, res) => {
   try {

      const Verified_Mobile = await employerService.exited_mobile(req) 
      const temp_mobile = await employerService.temp_mobile(req)

      console.log("Verified_Mobile : ", Verified_Mobile ? Verified_Mobile.recut_id : 'null')
      console.log("temp_mobile : ", temp_mobile ? temp_mobile.recut_id : 'null')

      if (Verified_Mobile && !temp_mobile) {

         logger.warn(loggerMessage.alreadyVerified)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, Verified_Mobile.mobile_no, responseMessage.alreadyVerified)
      }
      else if (temp_mobile && (!Verified_Mobile)) {

         if (temp_mobile.mobile_otp == req.body.mobile_otp) {

            const Verified = await employerService.Verified_Mobile(temp_mobile.recut_id)

            if (Verified == 1) {
               logger.info(loggerMessage.Verified)
               return response.success(req, res, statusCodes.HTTP_OK, temp_mobile.mobile_no, responseMessage.Verified)
            }
            else {
               logger.error(loggerMessage.updateDataFailure)
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_mobile.mobile_no, responseMessage.registerFailure)
            }
         } else {
            logger.warn(loggerMessage.invalidOTP)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP)
         }
      } else {
         logger.warn(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_mobile, responseMessage.notFound)
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest)
   }
}

Login_Register_Controller.employer_login = async (req, res) => {
   try {

      const exited_email = await employerService.exited_email(req)

      if (exited_email) {

         if (exited_email.comp_pass == req.body.comp_pass) {

            const Token = await helper.JWT_token({ email: exited_email.emp_email })

            logger.info(loggerMessage.loginSuccess)
            return response.success(req, res, statusCodes.HTTP_OK, Token, responseMessage.loginSuccess)
         }
         else {
            logger.warn(loggerMessage.passwordIncorrect)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, req.body.comp_pass, responseMessage.passwordIncorrect)
         }
      }
      else {
         logger.error(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, exited_email, responseMessage.notFound)
      }
   }
   catch (err) {
      logger.error(loggerMessage.unauthorized)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.loginFailure)
   }
}

Login_Register_Controller.emp_forgot_Password = async (req, res) => {
   try {

      const exited_email = await employerService.exited_email(req)

      if (exited_email) {

         const forgot_Password = {
            user_name: exited_email.comp_name,
            mail_id: exited_email.mail_id,
            password: exited_email.comp_pass
         }

         Email_Sender(exited_email.mail_id, null, forgot_Password)  // Sending Password through UserName and  Email

         logger.info(loggerMessage.passwordsended)
         return response.success(req, res, statusCodes.HTTP_ACCEPTED, exited_email.mail_id, responseMessage.passwordsended)
      }
      else {
         logger.warn(loggerMessage.userNotFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, exited_email, responseMessage.userNotFound)
      }
   }
   catch (err) {
      logger.warn(loggerMessage.errorInFindOne)
      return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, err, responseMessage.notFound)
   }
}

module.exports = Login_Register_Controller

