'use strict'
const db = require("../Models")

class SymposiumService { }

SymposiumService.create = async (obj) => {
   try {
      const saved = await db.Symposium.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

SymposiumService.findAllAndCount = async (symp_id) => {
   try {
      const findAllandCount = await db.Symposium.findAndCountAll({ where: { symp_id: symp_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

SymposiumService.getCollegeDetails = async (symp_id, symp_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__symposium as a 
                where 
                a.symp_id=${symp_id} and a.symp_status='${symp_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

SymposiumService.findByPk = async (symp_id) => {
   try {
      const findByPk = await db.Symposium.findByPk(symp_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

SymposiumService.update = async (symp_id, obj) => {
   try {

      const ext_Symposium = await db.Symposium.findOne({ where: obj })

      if (ext_Symposium && symp_id == ext_Symposium.symp_id) {

         return 'Exited Values'
      }
      else if (!ext_Symposium || (ext_Symposium && symp_id != ext_Symposium.symp_id)) {

         const updateById = await db.Symposium.update(obj, { where: { symp_id: symp_id } })
         return updateById[0]

      }
      else return 'Symposium Not Found'
   }
   catch (err) {
      return err
   }
}

SymposiumService.delete = async (symp_id) => {
   try {
      const founded = await db.Symposium.findByPk(symp_id)
      if (founded) {
         const deleted = await db.Symposium.destroy({ where: { symp_id: symp_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = SymposiumService