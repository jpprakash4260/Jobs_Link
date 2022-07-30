'use strict'
const db = require("../Models");
const {Op} = require('sequelize')

class SeekerService { };
SeekerService.search = async (req, modelName ) => {
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

module.exports = SeekerService