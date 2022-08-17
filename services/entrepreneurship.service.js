'use strict'
const db = require("../Models")

class EntrepreneurshipService { }

EntrepreneurshipService.create = async (obj) => {
   try {
      const saved = await db.Entrepreneurship.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EntrepreneurshipService.findAllAndCount = async (ent_id) => {
   try {
      const findAllandCount = await db.Entrepreneurship.findAndCountAll({ where: { ent_id: ent_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EntrepreneurshipService.getCollegeDetails = async (ent_id, ent_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__entrepreneurship as a 
                where 
                a.ent_id=${ent_id} and a.ent_status='${ent_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EntrepreneurshipService.findByPk = async (ent_id) => {
   try {
      const findByPk = await db.Entrepreneurship.findByPk(ent_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EntrepreneurshipService.update = async (ent_id, obj) => {
   try {

      const ext_entrepreneurship = await db.Entrepreneurship.findOne({ where: obj })

      if (ext_entrepreneurship && ent_id == ext_entrepreneurship.ent_id) {

         return 'Exited Values'
      }
      else if (!ext_entrepreneurship || (ext_entrepreneurship && ent_id != ext_entrepreneurship.ent_id)) {

         const updateById = await db.Entrepreneurship.update(obj, { where: { ent_id: ent_id } })
         return updateById[0]

      }
      else return 'Entrepreneurship Not Found'
   }
   catch (err) {
      return err
   }
}

EntrepreneurshipService.delete = async (ent_id) => {
   try {
      const founded = await db.Entrepreneurship.findByPk(ent_id)
      if (founded) {
         const deleted = await db.Entrepreneurship.destroy({ where: { ent_id: ent_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EntrepreneurshipService