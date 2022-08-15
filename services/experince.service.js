'use strict'
const db = require("../Models")

class ExperinceService { }

ExperinceService.create = async (obj) => {
   try {
      const saved = await db.Experince.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

ExperinceService.findAllAndCount = async (exp_id) => {
   try {
      const findAllandCount = await db.Experince.findAndCountAll({ where: { exp_id: exp_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

ExperinceService.getCollegeDetails = async (exp_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.exp_id=${exp_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

ExperinceService.findByPk = async (exp_id) => {
   try {
      const findByPk = await db.Experince.findByPk(exp_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

ExperinceService.update = async (exp_id, obj) => {
   try {

      const ext_Experince = await db.Experince.findOne({ where: obj })

      if (ext_Experince && exp_id == ext_Experince.exp_id) {

         return 'Exited Values'
      }
      else if (!ext_Experince || (ext_Experince && exp_id != ext_Experince.exp_id)) {

         const updateById = await db.Experince.update(obj, { where: { exp_id: exp_id } })
         return updateById[0]

      }
      else return 'Experince Not Found'
   }
   catch (err) {
      return err
   }
}

ExperinceService.delete = async (exp_id) => {
   try {
      const founded = await db.Experince.findByPk(exp_id)
      if (founded) {
         const deleted = await db.Experince.destroy({ where: { exp_id: exp_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = ExperinceService