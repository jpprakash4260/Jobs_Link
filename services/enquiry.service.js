'use strict'
const db = require("../Models")

class EnquiryService { }

EnquiryService.create = async (obj) => {
   try {
      const saved = await db.Enquiry.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

EnquiryService.findAllAndCount = async (enq_id) => {
   try {
      const findAllandCount = await db.Enquiry.findAndCountAll({ where: { enq_id: enq_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

EnquiryService.getCollegeDetails = async (enq_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.enq_id=${enq_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

EnquiryService.findByPk = async (enq_id) => {
   try {
      const findByPk = await db.Enquiry.findByPk(enq_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

EnquiryService.update = async (enq_id, obj) => {
   try {

      const ext_enquiry = await db.Enquiry.findOne({ where: obj })

      if (ext_enquiry && enq_id == ext_enquiry.enq_id) {

         return 'Exited Values'
      }
      else if (!ext_enquiry || (ext_enquiry && enq_id != ext_enquiry.enq_id)) {

         const updateById = await db.Enquiry.update(obj, { where: { enq_id: enq_id } })
         return updateById[0]

      }
      else return 'Enquiry Not Found'
   }
   catch (err) {
      return err
   }
}

EnquiryService.delete = async (enq_id) => {
   try {
      const founded = await db.Enquiry.findByPk(enq_id)
      if (founded) {
         const deleted = await db.Enquiry.destroy({ where: { enq_id: enq_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = EnquiryService