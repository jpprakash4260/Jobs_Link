'use strict'
const db = require("../Models");
const crudService = require("./crud.service")

class EmployerService { };
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