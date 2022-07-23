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

      key1 = 'emp_email'; value1 = req.body.emp_email; key2 = 'email_verify'; value2 = 'Y';
      const ext_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'emp_mobile'; value1 = req.body.emp_mobile; key2 = 'mobile_verify'; value2 = 'Y';
      const ext_mobile = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'emp_email'; value1 = req.body.emp_email; key2 = 'email_verify'; value2 = 'N';
      const temp_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key1 = 'emp_mobile'; value1 = req.body.emp_mobile; key2 = 'mobile_verify'; value2 = 'N';
      const temp_mobile = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      if (ext_email) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_email.emp_email, responseMessage.ext_email);

      } else if (ext_mobile) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_CONFLICT, ext_mobile.emp_mobile, responseMessage.ext_mobile);

      } else if (temp_email && temp_mobile) {
         const email_OTP = await loginRegisterService.gen_otp();
         const mobile_OTP = await loginRegisterService.gen_otp();
         console.log("email_OTP : ", email_OTP);
         console.log("mobile_OTP : ", mobile_OTP, "\n");
         const key1 = 'email_otp'; const value1 = email_OTP; const key2 = 'mobile_otp'; const value2 = mobile_OTP; const emp_id = temp_email.emp_id;
         const update_OTP = await crudService.updateSeeker_byId_2Field(emp_id, key1, value1, key2, value2)
         if (update_OTP == 1) {
            const to_email = req.body.emp_email
            const email_data = loginRegisterService.email_sender(to_email, email_OTP)
            logger.info(loggerMessage.updateDataSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, update_OTP, responseMessage.otpResended);
         } else {
            logger.error(loggerMessage.updateDataFailure);
            return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, data, responseMessage.otpNotUpdated);
         }
         // New Seeker OR sended_OTP
      } else {
         const email_OTP = await loginRegisterService.gen_otp();
         const mobile_OTP = await loginRegisterService.gen_otp();
         const created_seeker = await crudService.createSeeker(req, res, email_OTP, mobile_OTP);
         console.log("email_OTP : ", email_OTP);
         console.log("mobile_OTP : ", mobile_OTP, "\n");
         const to_email = req.body.emp_email
         const email_data = loginRegisterService.email_sender(to_email, email_OTP)
         logger.info(loggerMessage.otpSended);
         return response.success(req, res, statusCodes.HTTP_CREATED, created_seeker, responseMessage.otpSended);
      }
   } catch (err) {
      logger.error(loggerMessage.errInCreate);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errInCreate);
   }
};

LoginRegisterController.seeker_Verify = async (req, res) => {
   try {
      let {key, value ,key1, value1, key2, value2 } = ''

      key1 = 'emp_email'; value1 = req.body.emp_email; key2 = 'email_verify'; value2 = 'N';
      const temp_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);

      key = 'emp_email'; value = req.body.emp_email
      const anyOne_email = await crudService.findAllMatch(key, value)

      if (temp_email) {
         if (temp_email.email_otp == req.body.email_otp && temp_email.mobile_otp == req.body.mobile_otp) {
            const key1 = 'email_verify'; const value1 = "Y"; const key2 = 'mobile_verify';
            const value2 = "Y"; const emp_id = temp_email.emp_id;
            const Verified = await crudService.updateSeeker_byId_2Field(emp_id, key1, value1, key2, value2)
            if (Verified == 1) {
               let data = { emp_name: temp_email.emp_name, emp_email: temp_email.emp_email, emp_mobile: temp_email.emp_mobile }
               logger.info(loggerMessage.updateDataSuccess);
               return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.registerSuccess);
            } else {
               logger.error(loggerMessage.updateDataFailure);
               return response.errors(req, res, statusCodes.HTTP_NOT_MODIFIED, Verified, responseMessage.registerFailure);
            }
         } else {
            logger.warn(loggerMessage.invalidOTP);
            return response.errors(req, res, statusCodes.HTTP_NOT_ACCEPTABLE, responseMessage.invalidOTP);
         }
      } else if(!temp_email && anyOne_email) {
         logger.warn(loggerMessage.registerAlready);
         return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, temp_email, responseMessage.registerAlready);
      }
   } catch (err) {
      logger.error(loggerMessage.verificationFail);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.badRequest);
   }
};

LoginRegisterController.seeker_register_education = async (req, res) => {
   try {
      var emp_id = req.emp_id ? req.emp_id : 2   // Dynamic value from seeker_register API
      var bulk = req.body
      const updateregEdu = await crudService.updateBulkSeeker_byId(emp_id, bulk)
      if (updateregEdu == 1) {
         logger.info(loggerMessage.updateDataSuccess);
         return response.success(req, res, statusCodes.HTTP_OK, bulk, responseMessage.seekerUpdated);
      }
      else if (updateregEdu == 2) {
         logger.info(loggerMessage.alreadyExited);
         return response.success(req, res, statusCodes.HTTP_OK, bulk, responseMessage.alreadyExited);
      } else if (updateregEdu == 0) {
         logger.info(loggerMessage.seekerNotUpdated);
         return response.success(req, res, statusCodes.HTTP_OK, updateregEdu, responseMessage.seekerNotUpdated);
      } else {
         logger.error(loggerMessage.updateDataFailure);
         return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, updateregEdu, responseMessage.errorInUpdating);
      }
   }
   catch (err) {
      logger.error(loggerMessage.updateDataFailure);
      return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, err, responseMessage.errorInUpdating);
   }
}

LoginRegisterController.seeker_login = async (req, res) => {
   try {
      let { key1, value1, key2, value2 } = ''
      key1 = 'emp_email'; value1 = req.body.emp_email; key2 = 'email_verify'; value2 = 'Y';
      const ext_email = await loginRegisterService.findseeker_2Field(key1, value1, key2, value2);
      console.log("ext_email : ", ext_email);
      if (ext_email) {
         if (ext_email.emp_pass == req.body.emp_pass) {
            let data = { email: ext_email.email }
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

