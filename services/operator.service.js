'use strict'
const db = require("../Models")

class OperatorService { }

OperatorService.create = async (obj) => {
   try {
      const saved = await db.Operator.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

OperatorService.findAllAndCount = async (op_id) => {
   try {
      const findAllandCount = await db.Operator.findAndCountAll({ where: { op_id: op_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

OperatorService.getCollegeDetails = async (op_id, op_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__operator as a 
                where 
                a.op_id=${op_id} and a.op_status='${op_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

OperatorService.findByPk = async (op_id) => {
   try {
      const findByPk = await db.Operator.findByPk(op_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

OperatorService.update = async (op_id, obj) => {
   try {

      const ext_Operator = await db.Operator.findOne({ where: obj })

      if (ext_Operator && op_id == ext_Operator.op_id) {

         return 'Exited Values'
      }
      else if (!ext_Operator || (ext_Operator && op_id != ext_Operator.op_id)) {

         const updateById = await db.Operator.update(obj, { where: { op_id: op_id } })
         return updateById[0]

      }
      else return 'Operator Not Found'
   }
   catch (err) {
      return err
   }
}

OperatorService.delete = async (op_id) => {
   try {
      const founded = await db.Operator.findByPk(op_id)
      if (founded) {
         const deleted = await db.Operator.destroy({ where: { op_id: op_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = OperatorService