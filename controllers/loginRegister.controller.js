'use strict'

const { loginRegisterService, crudService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');
const LoginRegisterService = require('../services/loginRegister.service');


class LoginRegisterController { };
LoginRegisterController.seeker_register = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''

      key1 = 'email'; value1 = req.body.email; key2 = 'Verified'; value2 = 'Verified';
      const ext_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'mobile'; value1 = req.body.mobile;
      const ext_mobile = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'email'; value1 = req.body.email; value2 = 'Not Verified';
      const temp_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'mobile'; value1 = req.body.mobile;
      const temp_mobile = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      if (ext_email) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_email.email, responseMessage.ext_email);

      } else if (ext_mobile) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_mobile.mobile, responseMessage.ext_mobile);

      } else if (temp_email && temp_mobile) {
         const reGen_OTP = await loginRegisterService.gen_OTP();
         console.log("Resended_OTP : ", reGen_OTP, "\n");
         const key = 'OTP';
         const value = reGen_OTP;
         const seeker_id = temp_email.seeker_id || temp_mobile.seeker_id;
         const updatedSeeker = await crudService.update_byId(seeker_id, key, value)
         if (updatedSeeker == 1) {
            const to_email = req.body.email
            const gen_OTP = reGen_OTP
            const data = loginRegisterService.email_sender(to_email, gen_OTP)
            logger.info(loggerMessage.updateDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.otpResended);
         } else {
            logger.error(loggerMessage.updateDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, data, responseMessage.otpNotUpdated);
         }
         // New Seeker OR sended_OTP
      } else {
         const gen_OTP = await loginRegisterService.gen_OTP();
         const data = await crudService.createSeeker(req, res, gen_OTP);
         console.log("sended_OTP : ", gen_OTP, "\n");
         if (data.message && data.field) {
            logger.warn(loggerMessage.not_unique);
            return response.errors(req, res, statusCodes.HTTP_CONFLICT, data, responseMessage.Not_Unique);
         } else {
            const to_email = req.body.email
            const data = loginRegisterService.email_sender(to_email, gen_OTP)
            if (data) {
               logger.info(loggerMessage.otpSended);
               return response.success(req, res, statusCodes.HTTP_CREATED, data, responseMessage.otpSended);
            } else {
               logger.warn(loggerMessage.otpNotSended);
               return response.errors(req, res, statusCodes.HTTP_BAD_GATEWAY, data, responseMessage.otpNotSended);
            }
         }
      }
   } catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errInCreate);
   }
};

LoginRegisterController.seeker_Verify = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''

      key1 = 'email'; value1 = req.body.email; key2 = 'Verified'; value2 = 'Not Verified';
      const temp_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);
      if (temp_email) {
         if (temp_email.OTP == req.body.OTP) {
            const seeker_id = temp_email.seeker_id;
            let key = 'Verified'; let value = 'Verified';
            const Verified = await crudService.update_byId(seeker_id, key, value)
            if (Verified == 1) {
               logger.info(loggerMessage.updateDataSuccess);
               return response.success(req, res, statusCodes.HTTP_OK, Verified, responseMessage.registerSuccess);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, Verified, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.passwordIncorrect);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else {
         logger.warn(loggerMessage.getDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.badRequest);
   }
};

LoginRegisterController.seeker_login = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''
      key1 = 'email'; value1 = req.body.email; key2 = 'Verified'; value2 = 'Verified';
      const ext_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);
      if (ext_email) {
         if (ext_email.password == req.body.password) {
            let data = { email: ext_email.email }
            const Token = await loginRegisterService.JWT_token(data);
            logger.info(loggerMessage.tokenSended);
            return response.success(req, res, statusCodes.HTTP_OK, Token, responseMessage.loginSuccess);
         } else {
            logger.warn(loggerMessage.passwordIncorrect);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, req.body.password, responseMessage.passwordIncorrect);
         }
      } else {
         logger.error(loggerMessage.getDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, ext_email, responseMessage.loginFailure);
      }
   } catch (err) {
      logger.error(loggerMessage.unauthorized);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.loginFailure);
   }
}

LoginRegisterController.employer_register = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''

      key1 = 'mail_id'; value1 = req.body.mail_id; key2 = 'email_verify'; value2 = 'Y';
      const ext_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);

      key1 = 'mobile_no'; value1 = req.body.mobile_no; key2 = 'mobile_verify'; value2 = 'Y';
      const ext_mobile = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);

      key1 = 'mail_id'; value1 = req.body.mail_id; key2 = 'email_verify'; value2 = 'N';
      const temp_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);

      key1 = 'mobile_no'; value1 = req.body.mobile_no; key2 = 'mobile_verify'; value2 = 'N';
      const temp_mobile = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);

      // Already Exiting Email Id
      if (ext_email) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_email.mail_id, responseMessage.ext_email);

         // Already Exiting Mobile Number  
      } else if (ext_mobile) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_mobile.mobile_no, responseMessage.ext_mobile);

         // Temp Seeker OR Resended_OTP
      } else if (temp_email && temp_mobile) {
         const email_OTP = await loginRegisterService.gen_otp();
         const mobile_OTP = await loginRegisterService.gen_otp();
         const key1 = 'email_otp'; const value1 = email_OTP; const key2 = 'mobile_otp'; const value2 = mobile_OTP; const recut_id = temp_email.recut_id;
         const update_OTP = await crudService.updateEmp_byId_2Field(recut_id, key1, value1, key2, value2)
         console.log("email_OTP : ", email_OTP);
         console.log("mobile_OTP : ", mobile_OTP, "\n");
         if (update_OTP == 1) {
            const to_email = req.body.mail_id
            const email_data = loginRegisterService.email_sender(to_email, email_OTP)
            // let to_mobile = req.body.mobile_no
            // const mobile_data = await loginRegisterService.sms_sender(to_mobile, mobile_OTP)
            logger.info(loggerMessage.otpResended);
            return response.success(req, res, statusCodes.HTTP_OK, email_data, responseMessage.otpResended);
         } else {
            logger.warn(loggerMessage.updateDataFailure);
            return response.errors(req, res, statusCodes.HTTP_CONFLICT, update_OTP, responseMessage.otpNotUpdated);
         }
         // New Seeker OR sended_OTP
      } else {
         const email_OTP = await loginRegisterService.gen_otp();
         const mobile_OTP = await loginRegisterService.gen_otp();
         const data = await crudService.createEmployer(req, res, email_OTP, mobile_OTP);
         console.log("email_OTP : ", email_OTP);
         console.log("mobile_OTP : ", mobile_OTP, "\n");
         if (data.message && data.field) {
            logger.warn(loggerMessage.not_unique);
            return response.errors(req, res, statusCodes.HTTP_CONFLICT, data, responseMessage.Not_Unique);
         } else {
            const to_email = req.body.mail_id
            const email_data = loginRegisterService.email_sender(to_email, email_OTP)
            // const to_mobile = req.body.mobile_no
            // const mobile_data = loginRegisterService.sms_sender(to_mobile, mobile_OTP)
            if (email_data) {
               logger.info(loggerMessage.otpSended);
               return response.success(req, res, statusCodes.HTTP_OK, email_data, responseMessage.otpSended);
            } else {
               logger.warn(loggerMessage.otpNotSended);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, data, responseMessage.otpNotSended);
            }
         }
      }
   } catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.errInCreate);
   }
}

LoginRegisterController.employer_Verify = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''

      key1 = 'mail_id'; value1 = req.body.mail_id; key2 = 'email_verify'; value2 = 'N';
      const temp_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);

      if (temp_email) {
         if (temp_email.email_otp == req.body.mail_otp && temp_email.mobile_otp == req.body.mobile_otp) {
            const key1 = 'email_verify'; const value1 = "Y"; const key2 = 'mobile_verify';
            const value2 = "Y"; const recut_id = temp_email.recut_id;
            const Verified = await crudService.updateEmp_byId_2Field(recut_id, key1, value1, key2, value2)
            if (Verified == 1) {
               logger.info(loggerMessage.updateDataSuccess);
               return response.success(req, res, statusCodes.HTTP_OK, Verified, responseMessage.registerSuccess);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, Verified, responseMessage.registerFailure);
            }
         } else {
            logger.error(loggerMessage.invalidOTP);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, responseMessage.invalidOTP);
         }
      } else {
         logger.error(loggerMessage.getDataFailure);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.badRequest);
   }
};

LoginRegisterController.employer_login = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''
      key1 = 'mail_id'; value1 = req.body.mail_id; key2 = 'email_verify'; value2 = 'Y';
      const ext_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);
      if (ext_email) {
         if (ext_email.comp_pass == req.body.comp_pass) {
            let data = { email: ext_email.mail_id }
            const Token = await loginRegisterService.JWT_token(data);
            const settoLocalStorage = await LoginRegisterService.setToLocalstorage(Token)
            const getLocalstorage = await LoginRegisterService.getToLocalstorage()
            // console.log("set : ", settoLocalStorage);
            // console.log("get : ", getLocalstorage);
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
      let { key1, value1, key2, value2 } = ''
      key1 = 'mail_id'; value1 = req.body.mail_id; key2 = 'email_verify'; value2 = 'Y';
      const ext_email = await loginRegisterService.findemp_2Field(key1, value1, key2, value2);
      if (ext_email) {
         const to_email = ext_email.mail_id
         const forgot_Password = { user_name: ext_email.comp_name, mail_id: ext_email.mail_id, password: ext_email.comp_pass }
         let email_OTP = null
         const email = loginRegisterService.email_sender(to_email, email_OTP, forgot_Password)
         logger.info(loggerMessage.passwordsended)
         return response.success(req, res, statusCodes.HTTP_ACCEPTED, to_email, responseMessage.passwordsended)
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

