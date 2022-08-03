'use strict'
const db = require("../Models");
const upload = require("../validators/cloudinary.validator")
const moment = require('moment');
const { networkInterfaces } = require('os');
const { sequelize } = require('sequelize')

class CrudService { };
CrudService.createSeeker = async (req, res, email_OTP, mobile_OTP) => {
    try {
        let resume = 'not Attached'
        if (req.file) if (req.file.path) resume = (await upload.uploader.upload(req.file.path)).secure_url
        const created_ = {
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
            emp_date: moment().format(),
            lastupdate: '',
            ipaddress: await CrudService.get_IP()
        }
        let saved_seeker = await db.Employee.create(created_)
        return saved_seeker;
    } catch (err) {
        if (err.name == "SequelizeUniqueConstraintError" && err.errors[0].type == "unique violation" && err.errors[0].validatorKey == "not_unique") {
            let unique_err = {
                error: "unique_error",
                message: err.errors[0].message,
                field: err.errors[0].path,
            }
            return unique_err;
        } else {
            console.log("Error in catch : ", err);
            return err;
        }
    }
}

CrudService.createEmployer = async (req, email_otp, mobile_otp) => {
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
            mobile_otp: mobile_otp,
            ipaddress: req.ip
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

CrudService.createKeySkills = async (req, res) => {
    try{
        let obj = {
            emp_id: req.seeker_id,
            keysk_id: 1,
            keysk_name: req.body.keysk_name,
            empkskil_status: 'Y',
            empkskil_date: moment().format(),
            lastupdate: ''
        }
        let KeySkills = await db.EmployeeKeyskills.create(obj)
        return KeySkills
    }catch(err){
        return err
    }
}

CrudService.createEmployement = async (req, res) => {
    try {
        let obj = {
            emp_id: req.seeker_id,
            emp_desig: req.body.emp_desig,
            emp_org: req.body.emp_org,
            cur_comp: 'Y',
            exp_yr: req.body.exp_yr,
            exp_month: req.body.exp_month,
            exp_yr_to: req.body.exp_yr_to,
            exp_month_to: req.body.exp_month_to,
            emp_detail: req.body.emp_detail,
            wrk_date: moment().format(),
            lastupdate: ''
        }
        let KeySkills = await db.EmployeeOfficialDetails.create(obj)
        return KeySkills
    } catch (err) {
        return err
    }
}

CrudService.findAll = async (modelName) => {
    try {
        const founded = await db[modelName].findAll({})
        return founded
    } catch (err) {
        return err
    }
}

CrudService.findByPk = async (_id, modelName) => {
    try {
        const founded = await db[modelName].findByPk(_id)
        return founded
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
        const founded = await db[modelName].findOne({ where: obj })
        return founded
    } catch (err) {
        return err
    }
}

CrudService.findAllMatch = async (obj, modelName) => {
    try {
        const founded = await db[modelName].findAll({ where: obj })
        return founded
    } catch (err) {
        console.log(err);
        return err
    }
}

CrudService.alreadyExtObj = async (obj1, obj2) => {
    try {
        let checked = 'all same'
        for (let i = 0; i < Object.keys(obj1).length; i++) {
            if (Object.values(obj1)[i] == (obj2[Object.keys(obj1)[i]])) continue
            else checked = 'all not same'; break
        }
        console.log("checked => ", checked)
        return checked
    } catch (err) {
        return err
    }
}

CrudService.search = async (req, modelName) => {
    try {
        const search = await db[modelName].findAll({
            where: {
                [Op.or]: [
                    { emp_email: { [Op.like]: "%" + req.query.search + "%" } },
                    { emp_mobile: { [Op.like]: "%" + req.query.search + "%" } }]
            }
        })
        return search
    } catch (err) {
        return err
    }
}

CrudService.updateSeeker_byId = async (emp_id, obj) => {
    try {
        const founded = await db.Employee.findByPk(emp_id)
        let checked = 'all same'
        for (let i = 0; i < Object.keys(obj).length; i++) {
            if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) {
                // console.log(Object.values(obj)[i], founded[Object.keys(obj)[i]])
                continue
            }
            else checked = 'all not same';
            break
        }
        if (checked == 'all not same') {
            obj['lastupdate'] = moment().format()
            const updated = await db.Employee.update(obj, { where: { emp_id: emp_id } });
            return updated[0]
        }
        else return 2
    } catch (err) {
        console.log(err);
        return err
    }
}

CrudService.update_byId = async (_id, obj, modelName) => {
    try {
        var tableName = db.EmployeeOfficialDetails.getTableName()
        var Query = 'show columns from '+ tableName +' where `Key` = "PRI" '
        const primaryKey = await db.sequelize.query(Query)
        var pk = ((primaryKey[0])[0]).Field
        const founded = await db.EmployeeOfficialDetails.findByPk(_id)
        let checked = 'all same'
        for (let i = 0; i < Object.keys(obj).length; i++) {
            if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) {
                // console.log(Object.values(obj)[i], founded[Object.keys(obj)[i]])
                continue
            }
            else checked = 'all not same'
            break
        }
        if (checked == 'all not same') {
            obj['lastupdate'] = moment().format()
            const updated = await db.EmployeeOfficialDetails.update(obj, { where: { [pk] : _id } });
            return updated[0]
        }
        else return 2
    } catch (err) {
        console.log(err);
        return err
    }
}

CrudService.updateEmp_byId = async (recut_id, obj) => {
    try {
        const founded = await db.RecutComp.findByPk(recut_id)
        let checked = 'all same'
        for (let i = 0; i < Object.keys(obj).length; i++) {
            if (Object.values(obj)[i] == (founded[Object.keys(obj)[i]])) continue
            else checked = 'all not same' //console.log(Object.values(obj)[i], founded[Object.keys(obj)[i]], ' <== is not same');
            break
        }
        // console.log("checked ==> ", checked);
        if (checked == 'all not same') {
            obj['lastupdate'] = moment().format()
            const updated = await db.RecutComp.update(obj, { where: { recut_id: recut_id } }) //console.log(updated[0]); 
            return updated[0]
        }
        else return 2
    } catch (err) {
        return err
    }
}

CrudService.otp_seeker = async (_id, email_otp, mobile_otp) => {
    try {
        const updated = await db.Employee.update({ mobile_otp: mobile_otp, email_otp: email_otp, lastupdate: moment().format() }, { where: { emp_id: _id } })
        return updated[0]
    } catch (err) {
        return err
    }
}

CrudService.otp_emp = async (_id, mobile_otp, email_otp) => {
    try {
        const updated = await db.RecutComp.update({ mobile_otp: mobile_otp, email_otp: email_otp, lastupdate: moment() }, { where: { recut_id: _id } })
        return updated[0]
    } catch (err) {
        return err
    }
}

CrudService.delete_User = async (obj, modelName) => {
    try {
        // console.log('obj : ',obj, 'modelName : ', modelName);
        const deleted = await db[modelName].destroy({ where: obj })
        return deleted
    } catch (err) {
        return err
    }
}

CrudService.Truncate = async (tableName) => {
    try {
        const Truncate = await db.sequelize.query(`TRUNCATE TABLE ${tableName}`)
        return Truncate
    } catch (err) {
        return err
    }
}

CrudService.get_IP = async () => {
    try {
        const nets = networkInterfaces();
        const results = Object.create(null); // Or just '{}', an empty object

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) { results[name] = [] }
                    results[name].push(net.address)
                    return results.WiFi ? results.WiFi[0] : results
                }
            }
        }
    } catch (err) {
        return err
    }
}

CrudService.getEmployement = async (tableName) => {
    try {
        const query = await db.sequelize.query(`SELECT tbl__employee.emp_id, tbl__employee.emp_name, tbl__empoffdetails.emp_desig,tbl__empoffdetails._id  FROM tbl__employee
        INNER JOIN tbl__empoffdetails ON tbl__employee.emp_id = tbl__empoffdetails.emp_id`)
        return query
    } catch (err) {
        console.log("error in catch : ", err)
        return err
    }
} 


module.exports = CrudService;