'use strict'
const db = require("../Models")

class KeySkillsService { }

KeySkillsService.create = async (obj) => {
   try {
      const saved = await db.KeySkills.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

KeySkillsService.findAllAndCount = async (keysk_id) => {
   try {
      const findAllandCount = await db.KeySkills.findAndCountAll({ where: { keysk_id: keysk_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

KeySkillsService.getCollegeDetails = async (keysk_id, keysk_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.keysk_id=${keysk_id} and a.keysk_status='${keysk_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

KeySkillsService.findByPk = async (keysk_id) => {
   try {
      const findByPk = await db.KeySkills.findByPk(keysk_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

KeySkillsService.update = async (keysk_id, obj) => {
   try {

      const ext_keyskills = await db.KeySkills.findOne({ where: obj })

      if (ext_keyskills && keysk_id == ext_keyskills.keysk_id) {

         return 'Exited Values'
      }
      else if (!ext_keyskills || (ext_keyskills && keysk_id != ext_keyskills.keysk_id)) {

         const updateById = await db.KeySkills.update(obj, { where: { keysk_id: keysk_id } })
         return updateById[0]

      }
      else return 'KeySkills Not Found'
   }
   catch (err) {
      return err
   }
}

KeySkillsService.delete = async (keysk_id) => {
   try {
      const founded = await db.KeySkills.findByPk(keysk_id)
      if (founded) {
         const deleted = await db.KeySkills.destroy({ where: { keysk_id: keysk_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = KeySkillsService