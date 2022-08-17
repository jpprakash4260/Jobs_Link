'use strict'
const db = require("../Models");
const crudService = require("./crud.service")

class EmployerService { };


EmployerService.create = async (obj) => {
   try {
      const saved = await db.Employer.create(obj)
      return saved
   }
   catch (error) {
      return error
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



EmployerService.postJob = async (req, modelName) => {
   try {
      const obj = req.body
      const finded = await crudService.findOne(obj, modelName)
      if (finded) {
         let exitedJob_id = { unrst_jid: finded.unrst_jid };
         return exitedJob_id
      }
      else {
         let saved_seeker = await db[modelName].create(obj);
         return saved_seeker
      }
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

module.exports = EmployerService