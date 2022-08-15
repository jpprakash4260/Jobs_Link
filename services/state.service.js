'use strict'
const db = require("../Models")

class StateService { }

StateService.create = async (obj) => {
   try {
      const saved = await db.State.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

StateService.findAllAndCount = async (state_id) => {
   try {
      const findAllandCount = await db.State.findAndCountAll({ where: { state_id: state_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

StateService.getCollegeDetails = async (state_id, state_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__state as a 
                where 
                a.state_id=${state_id} and a.state_status='${state_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

StateService.findByPk = async (state_id) => {
   try {
      const findByPk = await db.State.findByPk(state_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

StateService.update = async (state_id, obj) => {
   try {

      const ext_State = await db.State.findOne({ where: obj })

      if (ext_State && state_id == ext_State.state_id) {

         return 'Exited Values'
      }
      else if (!ext_State || (ext_State && state_id != ext_State.state_id)) {

         const updateById = await db.State.update(obj, { where: { state_id: state_id } })
         return updateById[0]

      }
      else return 'State Not Found'
   }
   catch (err) {
      return err
   }
}

StateService.delete = async (state_id) => {
   try {
      const founded = await db.State.findByPk(state_id)
      if (founded) {
         const deleted = await db.State.destroy({ where: { state_id: state_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = StateService