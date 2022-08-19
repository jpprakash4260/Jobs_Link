'use strict'
const db = require("../Models");
class EmployerService { }

EmployerService.create = async (obj) => {
   try {
      const saved = await db.Employer.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EmployerService.exited_email = async (req) => {
   try {

      const exited_email = await db.Employer.findOne({ where: { mail_id: req.body.mail_id, email_verify: 'Y' } })
      return exited_email
   }
   catch (error) {
      return error
   }
}

EmployerService.exited_mobile = async (req) => {
   try {

      const exited_mobile = await db.Employer.findOne({ where: { mobile_no: req.body.mobile_no, mobile_verify: 'Y' } })
      return exited_mobile
   }
   catch (error) {
      return error
   }
}

EmployerService.temp_email = async (req) => {
   try {

      const temp_email = await db.Employer.findOne({ where: { mail_id: req.body.mail_id, email_verify: 'N' } })
      return temp_email
   }
   catch (error) {
      return error
   }
}

EmployerService.temp_mobile = async (req) => {
   try {

      const temp_mobile = await db.Employer.findOne({ where: { mobile_no: req.body.mobile_no, mobile_verify: 'N' } })
      return temp_mobile
   }
   catch (error) {
      return error
   }
}

EmployerService.update_OTP = async (recut_id, email_OTP, mobile_OTP) => {
   try {
      const update_OTP = await db.Employer.update({ mobile_otp: mobile_OTP, email_otp: email_OTP }, { where: { recut_id: recut_id } })
      return update_OTP[0]
   }
   catch (err) {
      return err
   }
}

EmployerService.Verified_Email = async (recut_id) => {
   try {
      const Verifed_email = await db.Employer.update({ email_verify: 'Y' }, { where: { recut_id: recut_id } })
      return Verifed_email[0]
   }
   catch (err) {
      return err
   }
}

EmployerService.Verified_Mobile = async (recut_id) => {
   try {
      const Verified_Mobile = await db.Employer.update({ mobile_verify: 'Y' }, { where: { recut_id: recut_id } })
      return Verified_Mobile[0]
   }
   catch (err) {
      return err
   }
}

EmployerService.findAllAndCount = async (recut_id) => {
   try {
      const findAllandCount = await db.Employer.findAndCountAll({ where: { recut_id: recut_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EmployerService.getCollegeDetails = async (recut_id, recut_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__recutcomp as a 
                where 
                a.recut_id=${recut_id} and a.recut_status='${recut_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EmployerService.findByPk = async (recut_id) => {
   try {
      const findByPk = await db.Employer.findByPk(recut_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EmployerService.update = async (recut_id, obj) => {
   try {

      const ext_Employer = await db.Employer.findOne({ where: obj })

      if (ext_Employer && recut_id == ext_Employer.recut_id) {

         return 'Exited Values'
      }
      else if (!ext_Employer || (ext_Employer && recut_id != ext_Employer.recut_id)) {

         const updateById = await db.Employer.update(obj, { where: { recut_id: recut_id } })
         return updateById[0]

      }
      else return 'Employer Not Found'
   }
   catch (err) {
      return err
   }
}

EmployerService.delete = async (recut_id) => {
   try {
      const founded = await db.Employer.findByPk(recut_id)
      if (founded) {
         const deleted = await db.Employer.destroy({ where: { recut_id: recut_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}

EmployerService.deleteByMobile = async (temp_mobile) => {

   try {

      const deleted = await db.Employer.destroy({ where: { mobile_no: temp_mobile.mobile_no } })
      return deleted

   } catch (err) {
      return err
   }
}

EmployerService.deleteByEmail = async (temp_email) => {

   try {

      const deleted = await db.Employer.destroy({ where: { mail_id: temp_email.mail_id } })
      return deleted

   } catch (err) {
      return err
   }
}

module.exports = EmployerService