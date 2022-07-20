'use strict'
const { date } = require("joi");
const db = require("../Models");
const { email_otp } = require("./loginRegister.service");

class CrudService { };
CrudService.createSeeker = async (req, res, gen_OTP) => {
    try {
        const created_ = {
            seeker_name: req.body.seeker_name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            resume: req.body.resume,
            OTP: gen_OTP,
            account_status: "Not Verified"
        }
        let saved_seeker = await db.JobSeeker.create(created_)
        return saved_seeker;
    } catch (err) {
        if (err.name == "SequelizeUniqueConstraintError" && err.errors[0].type == "unique violation"
            && err.errors[0].validatorKey == "not_unique") {
            let unique_err = {
                error: "unique_error",
                message: err.errors[0].message,
                field: err.errors[0].path,
            }
            return unique_err;
        } else {
            return err;
        }

    }
}

CrudService.createEmployer = async (req, res, email_otp, mobile_otp) => {
    try {
        const created_ = {
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
            email_otp: email_otp,
            mobile_otp: mobile_otp
        }
        let saved_employee = await db.RecutComp.create(created_)
        return saved_employee;
    } catch (err) {
        if (err.name == "SequelizeUniqueConstraintError" && err.errors[0].type == "unique violation"
            && err.errors[0].validatorKey == "not_unique") {
            let unique_err = {
                error: "unique_error",
                message: err.errors[0].message,
                field: err.errors[0].path,
            }
            return unique_err;
        } else {
            return err;
        }

    }
}

CrudService.findAllSeeker = async () => {
    try {
        const foundedAllSeekers = await db.JobSeeker.findAll({})
        return foundedAllSeekers
    } catch (err) {
        return err
    }
}

CrudService.findByPk = async (seeker_id) => {
    try {
        const foundedSeeker = await db.JobSeeker.findByPk(seeker_id)
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.findOneSeeker = async (key, value) => {
    try {
        const foundedSeeker = await db.JobSeeker.findOne({ where: { [key]: value } })
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.findAllMatch = async (key, value) => {
    try {
        const foundedSeeker = await db.JobSeeker.findAll({ where: { [key]: value } })
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.updateSeeker_byId = async (seeker_id, key, value) => {
    try {
        const updatedSeeker = await db.JobSeeker.update({ [key]: value }, { where: { seeker_id: seeker_id } })
        return updatedSeeker[0]
    } catch (err) {
        return err
    }
}

CrudService.updateEmp_byId = async (employer_id, key, value) => {
    try {
        const updatedSeeker = await db.RecutComp.update({ [key]: value }, { where: { employer_id: employer_id } })
        return updatedSeeker[0]
    } catch (err) {
        return err
    }
}

CrudService.updateEmp_byId_2Field = async (recut_id, key1, value1, key2, value2) => {
    try {
        const updatedSeeker = await db.RecutComp.update({ [key1]: value1 , [key2]: value2 }, { where: { recut_id: recut_id } })
        return updatedSeeker[0]
    } catch (err) {
        return err
    }
}

CrudService.delete_byId = async (seeker_id) => {
    try {
        const deletedSeeker = await db.JobSeeker.destroy({ where: { seeker_id: seeker_id } })
        return deletedSeeker
    } catch (err) {
        return err
    }
}

module.exports = CrudService;