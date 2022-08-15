'use strict'
const db = require("../Models")

class WorkShopsService { }

WorkShopsService.create = async (obj) => {
   try {
      const saved = await db.Workshops.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

WorkShopsService.findAllAndCount = async (work_id) => {
   try {
      const findAllandCount = await db.Workshops.findAndCountAll({ where: { work_id: work_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

WorkShopsService.getCollegeDetails = async (work_id, work_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__workshops as a 
                where 
                a.work_id=${work_id} and a.work_status='${work_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

WorkShopsService.findByPk = async (work_id) => {
   try {
      const findByPk = await db.Workshops.findByPk(work_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

WorkShopsService.update = async (work_id, obj) => {
   try {

      const ext_WorkShops = await db.Workshops.findOne({ where: obj })

      if (ext_WorkShops && work_id == ext_WorkShops.work_id) {

         return 'Exited Values'
      }
      else if (!ext_WorkShops || (ext_WorkShops && work_id != ext_WorkShops.work_id)) {

         const updateById = await db.Workshops.update(obj, { where: { work_id: work_id } })
         return updateById[0]

      }
      else return 'Workshops Not Found'
   }
   catch (err) {
      return err
   }
}

WorkShopsService.delete = async (work_id) => {
   try {
      const founded = await db.Workshops.findByPk(work_id)
      if (founded) {
         const deleted = await db.Workshops.destroy({ where: { work_id: work_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = WorkShopsService