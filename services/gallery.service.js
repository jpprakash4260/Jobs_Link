'use strict'
const db = require("../Models")

class GalleryService { }

GalleryService.create = async (obj) => {
   try {
      const saved = await db.Gallery.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

GalleryService.findAllAndCount = async (gal_id) => {
   try {
      const findAllandCount = await db.Gallery.findAndCountAll({ where: { gal_id: gal_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

GalleryService.getCollegeDetails = async (gal_id, gal_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__gallery as a 
                where 
                a.gal_id=${gal_id} and a.gal_status='${gal_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

GalleryService.findByPk = async (gal_id) => {
   try {
      const findByPk = await db.Gallery.findByPk(gal_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

GalleryService.update = async (gal_id, obj) => {
   try {

      const ext_gallery = await db.Gallery.findOne({ where: obj })

      if (ext_gallery && gal_id == ext_gallery.gal_id) {

         return 'Exited Values'
      }
      else if (!ext_gallery || (ext_gallery && gal_id != ext_gallery.gal_id)) {

         const updateById = await db.Gallery.update(obj, { where: { gal_id: gal_id } })
         return updateById[0]

      }
      else return 'Gallery Not Found'
   }
   catch (err) {
      return err
   }
}

GalleryService.delete = async (gal_id) => {
   try {
      const founded = await db.Gallery.findByPk(gal_id)
      if (founded) {
         const deleted = await db.Gallery.destroy({ where: { gal_id: gal_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = GalleryService