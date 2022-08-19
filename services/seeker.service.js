'use strict'
const { email } = require("../config/email.config")
const db = require("../Models")

class SeekerService { }

SeekerService.create = async (obj) => {
   try {
      const saved = await db.Employee.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

SeekerService.findOne = async (obj) => {
   try {

      const exited_email = await db.Employee.findOne({ where: obj})
      return exited_email
   }
   catch (error) {
      return error
   }
}

SeekerService.findByEmail = async (email) => {
   try {

      const exited_email = await db.Employee.findOne({ where: { emp_email : email} })
      return exited_email
   }
   catch (error) {
      return error
   }
}

SeekerService.exited_email = async (req) => {
   try {

      const exited_email = await db.Employee.findOne({ where: { emp_email: req.body.emp_email, email_verify: 'Y' } })
      return exited_email
   }
   catch (error) {
      return error
   }
}

SeekerService.exited_mobile = async (req) => {
   try {

      const exited_mobile = await db.Employee.findOne({ where: { emp_mobile: req.body.emp_mobile, mobile_verify: 'Y' } })
      return exited_mobile
   }
   catch (error) {
      return error
   }
}

SeekerService.temp_email = async (req) => {
   try {

      const temp_email = await db.Employee.findOne({ where: { emp_email: req.body.emp_email, email_verify: 'N' } })
      return temp_email
   }
   catch (error) {
      return error
   }
}

SeekerService.temp_mobile = async (req) => {
   try {

      const temp_mobile = await db.Employee.findOne({ where: { emp_mobile: req.body.emp_mobile, mobile_verify: 'N' } })
      return temp_mobile
   }
   catch (error) {
      return error
   }
}

SeekerService.findAllAndCount = async (emp_id) => {
   try {
      const findAllandCount = await db.Employee.findAndCountAll({ where: { emp_id: emp_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

SeekerService.getCollegeDetails = async (emp_id, emp_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__employee as a 
                where 
                a.emp_id=${emp_id} and a.emp_status='${emp_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

SeekerService.findByPk = async (emp_id) => {
   try {
      const findByPk = await db.Employee.findByPk(emp_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

SeekerService.update = async (emp_id, obj) => {
   try {

      const ext_seeker = await db.Employee.findOne({ where: obj })

      if (ext_seeker && emp_id == ext_seeker.emp_id) {

         return 'Exited Values'
      }
      else if (!ext_seeker || (ext_seeker && emp_id != ext_seeker.emp_id)) {

         const updateById = await db.Employee.update(obj, { where: { emp_id: emp_id } })
         return updateById[0]

      }
      else return 'Seeker Not Found'
   }
   catch (err) {
      return err
   }
}

SeekerService.update_OTP = async (emp_id, email_OTP, mobile_OTP) => {
   try {
      const update_OTP = await db.Employee.update({ mobile_otp: mobile_OTP, email_otp: email_OTP }, { where: { emp_id: emp_id } })
      return update_OTP[0]
   }
   catch (err) {
      return err
   }
}

SeekerService.Verified_Email = async (emp_id) => {
   try {
      const Verifed_email = await db.Employee.update({ email_verify: 'Y' }, { where: { emp_id: emp_id } })
      return Verifed_email[0]
   }
   catch (err) {
      return err
   }
}

SeekerService.Verified_Mobile = async (emp_id) => {
   try {
      const Verified_Mobile = await db.Employee.update({ mobile_verify: 'Y' }, { where: { emp_id: emp_id } })
      return Verified_Mobile[0]
   }
   catch (err) {
      return err
   }
}

SeekerService.deleteByPk = async (emp_id) => {
   try {

      const founded = await db.Employee.findByPk(emp_id)

      if (founded) {
         const deleted = await db.Employee.destroy({ where: { emp_id: emp_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}

SeekerService.deleteByMobile = async (temp_mobile) => {

   try {

      const deleted = await db.Employee.destroy({ where: { emp_mobile: temp_mobile.emp_mobile } })
      return deleted

   } catch (err) {
      return err
   }
}

SeekerService.deleteByEmail = async (temp_email) => {

   try {

      const deleted = await db.Employee.destroy({ where: { emp_email: temp_email.emp_email } })
      return deleted

   } catch (err) {
      return err
   }
}


module.exports = SeekerService