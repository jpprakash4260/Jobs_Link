'use strict'
const db = require("../Models")

class CollegeService { }

CollegeService.create = async (obj) => {
   try {
      const saved = await db.GovernmentJobNews.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CollegeService.findAllAndCount = async (gnews_id) => {
   try {
      const findAllandCount = await db.GovernmentJobNews.findAndCountAll({ where: { gnews_id: gnews_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CollegeService.getCollegeDetails = async (gnews_id, colg_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__colg as a 
                where 
                a.gnews_id=${gnews_id} and a.colg_status='${colg_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

CollegeService.findByPk = async (gnews_id) => {
   try {
      const findByPk = await db.GovernmentJobNews.findByPk(gnews_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CollegeService.update = async (gnews_id, obj) => {
   try {

      const ext_govjobnews = await db.GovernmentJobNews.findOne({ where: obj })

      if (ext_govjobnews && gnews_id == ext_govjobnews.gnews_id) {

         return 'Exited Values'
      }
      else if (!ext_govjobnews || (ext_govjobnews && gnews_id != ext_govjobnews.gnews_id)) {

         const updateById = await db.GovernmentJobNews.update(obj, { where: { gnews_id: gnews_id } })
         return updateById[0]

      }
      else return 'GovernmentJobNews Not Found'
   }
   catch (err) {
      return err
   }
}

CollegeService.delete = async (gnews_id) => {
   try {
      const founded = await db.GovernmentJobNews.findByPk(gnews_id)
      if (founded) {
         const deleted = await db.GovernmentJobNews.destroy({ where: { gnews_id: gnews_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = CollegeService