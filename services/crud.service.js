'use strict'
const db = require("../Models");

class CrudService { };
CrudService.createSeeker = async (req, res, email_OTP, mobile_OTP) => {
    try {
        const created_ = {
            emp_name: req.body.emp_name,
            emp_email: req.body.emp_email,
            emp_pass: req.body.emp_pass,
            emp_mobile: req.body.emp_mobile,
            emp_country: req.body.emp_country,
            emp_state: req.body.emp_state,
            emp_city: req.body.emp_city,
            Filename: req.body.Filename,
            agreechk: req.body.agreechk,
            mobile_otp: mobile_OTP,
            email_otp: email_OTP,
        }
        let saved_seeker = await db.Employee.create(created_)
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

CrudService.findByPk = async (emp_id, modelName) => {
    try {
        const foundedSeeker = await db[modelName].findByPk(emp_id)
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.Emp_findByPk = async (recut_id) => {
    try {
        const foundedEmployer = await db.RecutComp.findByPk(recut_id)
        return foundedEmployer
    } catch (err) {
        return err
    }
}

CrudService.findOne = async (obj, modelName) => {
    try {
        const foundedSeeker = await db[modelName].findOne({ where: obj })
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.findAllMatch = async (obj, modelName) => {
    try {
        const foundedSeeker = await db[modelName].findAll({ where: obj })
        return foundedSeeker
    } catch (err) {
        return err
    }
}

CrudService.findAll_job = async (bulk, modelName) => {
    try {
        const founded = await db[modelName].findAll({ where: bulk })
        return founded
    } catch (err) {
        return err
    }
}

CrudService.updateSeeker_byId = async (emp_id, key, value) => {
    try {
        const updatedSeeker = await db.Employee.update({ [key]: value }, { where: { emp_id: emp_id } })
        return updatedSeeker[0]
    } catch (err) {
        return err
    }
}

CrudService.alreadyExtObj = async (obj1, obj2) => {
    try {
        let checked = 'all same'
        for (let i = 0; i < Object.keys(bulk).length; i++) {
            if (Object.values(bulk)[i] == (finded[Object.keys(bulk)[i]])) continue
            else checked = 'all not same'; break
        }
        console.log("checked => ", checked);
        return checked
    } catch (err) {
        return err
    }
}

CrudService.updateBulkSeeker_byId = async (emp_id, bulk) => {
    try {
        const checked = await CrudService.alreadyExtObj(emp_id, bulk)
        if (checked == 'all not same') { const updated = await db.Employee.update(bulk, { where: { emp_id: emp_id } }); return updated[0] }
        else return 2
    } catch (err) {
        return err
    }
}

CrudService.updateEmp_byId = async (recut_id, key, value) => {
    try {
        const foundedEmployer = await CrudService.Emp_findByPk(recut_id)
        if (foundedEmployer[key] == value) {
            const updated = 2
            return updated
        } else {
            const updated = await db.RecutComp.update({ [key]: value }, { where: { recut_id: recut_id } })
            return updated[0]
        }
    } catch (err) {
        return err
    }
}

CrudService.updateSeeker_byId_2Field = async (emp_id, key1, value1, key2, value2) => {
    try {
        const updatedSeeker = await db.Employee.update({ [key1]: value1, [key2]: value2 }, { where: { emp_id: emp_id } })
        return updatedSeeker[0]
    } catch (err) {
        return err
    }
}

CrudService.updateEmp_byId_2Field = async (recut_id, key1, value1, key2, value2) => {
    try {
        const updatedEmployer = await db.RecutComp.update({ [key1]: value1, [key2]: value2 }, { where: { recut_id: recut_id } })
        return updatedEmployer[0]
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