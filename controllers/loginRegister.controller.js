'use strict'

const { loginRegisterService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
const moment = require('moment')


class LoginRegisterController { };
LoginRegisterController.seeker_register = async (req, res) => {
   try {
      // const truncate = await crudService.Truncate('tbl__employee')

      let obj = { emp_email: req.body.emp_email, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'Employee')

      obj = { emp_mobile: req.body.emp_mobile, mobile_verify: 'Y' }
      const ext_mobile = await crudService.findOne(obj, 'Employee')

      obj = { emp_email: req.body.emp_email, mobile_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'Employee')

      obj = { emp_mobile: req.body.emp_mobile, mobile_verify: 'N' }
      const temp_mobile = await crudService.findOne(obj, 'Employee')

      if ((!ext_email) && (!ext_mobile) && (!temp_email) && (!temp_mobile)) {
         const create = await newSeeker(req, res)
      }
      else if (ext_email) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_email.emp_email, responseMessage.ext_email);

      } else if (ext_mobile) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_mobile.emp_mobile, responseMessage.ext_mobile);

      } else if (temp_email && temp_mobile) {
         if (temp_email.emp_id == temp_mobile.emp_id) await LoginRegisterController.resendOTP(req, res, temp_email)
         else {
            const deleted_Mobile = await crudService.delete_User({ emp_mobile: temp_mobile.emp_mobile }, 'Employee')
            const deleted_Email = await crudService.delete_User({ emp_email: temp_email.emp_email }, 'Employee')
            if (deleted_Mobile && deleted_Email) await newSeeker(req, res)
            else {
               logger.warn(loggerMessage.deleteDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted);
            }
         }
      } else if (((!temp_email) && temp_mobile) || (temp_email && (!temp_mobile))) {
         if ((!temp_email) && temp_mobile) {
            const deleted = await crudService.delete_User({ emp_mobile: temp_mobile.emp_mobile }, 'Employee')
            if (deleted) await newSeeker(req, res)
            else {
               logger.warn(loggerMessage.deleteDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted);
            }
         }
         else if (temp_email && (!temp_mobile)) {
            const deleted = await crudService.delete_User({ emp_email: temp_email.emp_email }, 'Employee')
            if (deleted) await newSeeker(req, res)
            else {
               logger.warn(loggerMessage.deleteDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NO_CONTENT, deleted, responseMessage.notDeleted);
            }
         }
      } else {
         logger.error(loggerMessage.notCreated);
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.notCreated);
      }
      async function newSeeker(req, res) {
         const email_OTP = await loginRegisterService.gen_otp()
         const mobile_OTP = await loginRegisterService.gen_otp()
         const created_seeker = await crudService.createSeeker(req, res, email_OTP, mobile_OTP);
         //console.log("email_OTP : ", email_OTP, '', "mobile_OTP : ", mobile_OTP, '\n')
         //const sms_data =   loginRegisterService.sms_sender(req.body.emp_mobile, mobile_OTP)
         const email_data = loginRegisterService.email_sender(req.body.emp_email, email_OTP);
         //email_data.then(() => { console.log('\n',"email_sended : ", email_data, '\n') })
         logger.info(loggerMessage.otpSended);
         return response.success(req, res, statusCodes.HTTP_CREATED, created_seeker, responseMessage.otpSended);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate);
   }
}

LoginRegisterController.resendOTP = async (req, res, temp_email) => {
   try {
      const email_OTP = await loginRegisterService.gen_otp()
      const mobile_OTP = await loginRegisterService.gen_otp()
      const update_OTP = await crudService.otp_seeker(temp_email.emp_id, email_OTP, mobile_OTP);
      //console.log("email_OTP : ", email_OTP,'', "mobile_OTP : ", mobile_OTP, '\n') 
      if (update_OTP == 1) {
         //const sms___data = (loginRegisterService.sms_sender(req.body.emp_mobile, mobile_OTP))
         const email_data = loginRegisterService.email_sender(req.body.emp_email, email_OTP);
         //email_data.then(() => { console.log(" email_sended : ", email_data, '\n' )})
         logger.info(loggerMessage.otpResended);
         return response.success(req, res, statusCodes.HTTP_OK, update_OTP, responseMessage.otpResended);
      } else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, update_OTP, responseMessage.otpNotUpdated);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.errorInUpdating);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

LoginRegisterController.seeker_Verify_Email = async (req, res) => {
   try {
      let obj = { emp_email: req.body.emp_email, email_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'Employee')

      obj = { emp_email: req.body.emp_email, email_verify: 'Y' }
      const Verified_email = await crudService.findOne(obj, 'Employee')

      if ((!temp_email) && Verified_email) {
         logger.warn(loggerMessage.alreadyVerified);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, Verified_email.emp_email, responseMessage.alreadyVerified);
      } else if (temp_email && (!Verified_email)) {
         if (temp_email.email_otp == req.body.email_otp) {
            const Verified = await crudService.updateSeeker_byId(temp_email.emp_id, { email_verify: 'Y' })
            if (Verified == 1) {
               logger.info(loggerMessage.Verified);
               return response.success(req, res, statusCodes.HTTP_OK, temp_email.emp_email, responseMessage.Verified);
            } else if (Verified == 2) {
               logger.warn(loggerMessage.alreadyVerified);
               return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.alreadyVerified);
            }
            else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.emp_email, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.invalidOTP)
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else {
         logger.warn(loggerMessage.notFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.notFound);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.verificationFail)
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest);
   }
}

LoginRegisterController.seeker_Verify_Mobile = async (req, res) => {
   try {
      let obj = { emp_email: req.body.emp_email, mobile_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'Employee')

      obj = { emp_email: req.body.emp_email, mobile_verify: 'Y' }
      const Verified_email = await crudService.findOne(obj, 'Employee')

      if ((!temp_email) && Verified_email) {
         logger.warn(loggerMessage.alreadyVerified);
         return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, Verified_email.emp_email, responseMessage.alreadyVerified);
      } else if (temp_email) {
         if (temp_email.mobile_otp == req.body.mobile_otp) {
            const Verified = await crudService.updateSeeker_byId(temp_email.emp_id, { mobile_verify: "Y" })
            if (Verified == 1) {
               logger.info(loggerMessage.Verified);
               return response.success(req, res, statusCodes.HTTP_OK, temp_email.emp_mobile, responseMessage.Verified);
            } else if (Verified == 2) {
               logger.warn(loggerMessage.registerAlready);
               return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.emp_mobile, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.invalidOTP);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else {
         logger.warn(loggerMessage.notFound);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.notFound);
      }
   } catch (err) {
      console.log(err);
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.badRequest);
   }
}

LoginRegisterController.seeker_register_education = async (req, res) => {
   try {
      const updateregEdu = await crudService.updateSeeker_byId(req.emp_id ? req.emp_id : 5, req.body)
      if (updateregEdu == 1) {
         logger.info(loggerMessage.updateDataSuccess);
         return response.success(req, res, statusCodes.HTTP_OK, req.body, responseMessage.seekerUpdated);
      }
      else if (updateregEdu == 2) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_OK, req.body, responseMessage.alreadyExited);
      } else if (updateregEdu == 0) {
         logger.info(loggerMessage.seekerNotUpdated);
         return response.success(req, res, statusCodes.HTTP_OK, updateregEdu, responseMessage.seekerNotUpdated);
      } else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, updateregEdu, responseMessage.errorInUpdating);
      }
   }
   catch (err) {
      console.log(err);
      logger.error(loggerMessage.updateDataFailure);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

LoginRegisterController.seeker_login = async (req, res) => {
   try {
      let obj = { emp_email: req.body.emp_email, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'Employee')
      if (ext_email) {
         if (ext_email.emp_pass == req.body.emp_pass) {
            let data = { email: ext_email.emp_email }
            const Token = await loginRegisterService.JWT_token(data);
            logger.info(loggerMessage.tokenSended);
            return response.success(req, res, statusCodes.HTTP_OK, Token, responseMessage.loginSuccess);
         } else {
            logger.warn(loggerMessage.passwordIncorrect);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, req.body.password, responseMessage.passwordIncorrect);
         }
      } else {
         logger.error(loggerMessage.notFound);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, ext_email, responseMessage.notFound);
      }
   } catch (err) {
      logger.error(loggerMessage.unauthorized);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.loginFailure);
   }
}

LoginRegisterController.seeker_forgot_Password = async (req, res) => {
   try {
      let obj = { emp_email: req.body.emp_email, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'Employee')
      if (ext_email) {
         const forgot_Password = { user_name: ext_email.emp_name, mail_id: ext_email.emp_email, password: ext_email.emp_pass }
         const email = loginRegisterService.email_sender(ext_email.emp_email, null, forgot_Password); email.then(() => { console.log('\n', "email_sended : ", email); })
         logger.info(loggerMessage.passwordsended)
         return response.success(req, res, statusCodes.HTTP_ACCEPTED, ext_email.emp_email, responseMessage.passwordsended)
      }
      else {
         logger.warn(loggerMessage.userNotFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, ext_email, responseMessage.userNotFound)
      }
   }
   catch (err) {
      logger.warn(loggerMessage.errorInFindOne)
      return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, err, responseMessage.notFound)
   }
}

LoginRegisterController.employer_register = async (req, res) => {
   try {

      let obj = { mail_id: req.body.mail_id, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'RecutComp')

      obj = { mobile_no: req.body.mobile_no, mobile_verify: 'Y' }
      const ext_mobile = await crudService.findOne(obj, 'RecutComp')

      obj = { mail_id: req.body.mail_id, email_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'RecutComp')

      obj = { mobile_no: req.body.mobile_no, mobile_verify: 'N' }
      const temp_mobile = await crudService.findOne(obj, 'RecutComp')

      if (ext_email) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_email.mail_id, responseMessage.ext_email);
      } else if (ext_mobile) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_mobile.mobile_no, responseMessage.ext_mobile);
      } else if (temp_email && temp_mobile) {
         const email_OTP = await loginRegisterService.gen_otp()
         const mobile_OTP = await loginRegisterService.gen_otp()
         const update_OTP = await crudService.otp_emp(temp_email.recut_id, email_OTP, mobile_OTP); console.log("email_OTP : ", email_OTP, " mobile_OTP", mobile_OTP, '\n')
         if (update_OTP == 1) {
            // const sms___data = (loginRegisterService.sms_sender(req.body.emp_mobile, mobile_OTP))
            const email_data = (loginRegisterService.email_sender(req.body.mail_id, email_OTP))//; email_data.then(() => {console.log("email_sended : ", email_data);})
            logger.info(loggerMessage.otpResended);
            return response.success(req, res, statusCodes.HTTP_OK, update_OTP, responseMessage.otpResended);
         } else {
            logger.warn(loggerMessage.alreadyExited);
            return response.errors(req, res, statusCodes.HTTP_CONFLICT, update_OTP, responseMessage.alreadyExited);
         }
      } else {
         const email_OTP = await loginRegisterService.gen_otp()
         const mobile_OTP = await loginRegisterService.gen_otp()
         const created_ = await crudService.createEmployer(req, email_OTP, mobile_OTP); console.log("email_otp : ", email_OTP, " mobile_otp : ", mobile_OTP, '\n');
         // const sms___data = (loginRegisterService.sms_sender(req.body.emp_mobile, mobile_OTP))
         const email_data = (loginRegisterService.email_sender(req.body.mail_id, email_OTP)); //email_data.then(() => { console.log("email_sended : ", email_data);})
         logger.info(loggerMessage.otpSended);
         return response.success(req, res, statusCodes.HTTP_OK, created_, responseMessage.otpSended);
      }
   } catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errInCreate);
   }
}

LoginRegisterController.employer_Verify_Email = async (req, res) => {
   try {
      let obj = { mail_id: req.body.mail_id, email_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'RecutComp')

      obj = { mail_id: req.body.mail_id }
      const Verifed_email = await crudService.findAllMatch(obj, 'RecutComp')

      if (temp_email) {
         if (temp_email.email_otp == req.body.email_otp) {
            const Verified = await crudService.updateEmp_byId(temp_email.recut_id, { email_verify: "Y" })
            if (Verified == 1) {
               logger.info(loggerMessage.updateDataSuccess);
               return response.success(req, res, statusCodes.HTTP_OK, temp_email.mail_id, responseMessage.registerSuccess);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.mail_id, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.invalidOTP);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else if (!temp_email && Verifed_email) {
         logger.warn(loggerMessage.registerAlready);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.badRequest);
   }
}

LoginRegisterController.employer_Verify_Mobile = async (req, res) => {
   try {
      let obj = { mail_id: req.body.mail_id, mobile_verify: 'N' }
      const temp_email = await crudService.findOne(obj, 'RecutComp')

      obj = { mail_id: req.body.mail_id }
      const Verifed_email = await crudService.findAllMatch(obj, 'RecutComp')

      if (temp_email) {
         if (temp_email.mobile_otp == req.body.mobile_otp) {
            const Verified = await crudService.updateEmp_byId(temp_email.recut_id, { mobile_verify: "Y" })
            if (Verified == 1) {
               logger.info(loggerMessage.updateDataSuccess);
               return response.success(req, res, statusCodes.HTTP_OK, temp_email.mobile_no, responseMessage.registerSuccess);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, temp_email.mobile_no, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.invalidOTP);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else if (!temp_email && Verifed_email) {
         logger.warn(loggerMessage.registerAlready);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.badRequest);
   }
}

LoginRegisterController.employer_login = async (req, res) => {
   try {
      let obj = { mail_id: req.body.mail_id, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'RecutComp')
      if (ext_email) {
         if (ext_email.comp_pass == req.body.comp_pass) {
            let data = { email: ext_email.mail_id }
            const Token = await loginRegisterService.JWT_token(data);
            logger.info(loggerMessage.tokenSended);
            return response.success(req, res, statusCodes.HTTP_OK, Token, responseMessage.loginSuccess);
         } else {
            logger.warn(loggerMessage.passwordIncorrect);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, req.body.password, responseMessage.passwordIncorrect);
         }
      } else {
         logger.error(loggerMessage.seekerNotFound);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, ext_email, responseMessage.seekerNotFound);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.loginFailure);
   }
}

LoginRegisterController.emp_forgot_Password = async (req, res) => {
   try {
      let obj = { mail_id: req.body.mail_id, email_verify: 'Y' }
      const ext_email = await crudService.findOne(obj, 'RecutComp')
      if (ext_email) {
         const forgot_Password = { user_name: ext_email.comp_name, mail_id: ext_email.mail_id, password: ext_email.comp_pass }
         const email = loginRegisterService.email_sender(ext_email.mail_id, null, forgot_Password); email.then(() => { console.log('\n', "email_sended : ", email); })
         logger.info(loggerMessage.passwordsended)
         return response.success(req, res, statusCodes.HTTP_ACCEPTED, ext_email.mail_id, responseMessage.passwordsended)
      }
      else {
         logger.warn(loggerMessage.userNotFound)
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, ext_email, responseMessage.userNotFound)
      }
   }
   catch (err) {
      logger.warn(loggerMessage.errorInFindOne)
      return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, err, responseMessage.notFound)
   }
}

module.exports = LoginRegisterController;

