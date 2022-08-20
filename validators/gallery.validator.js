const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class GalleryValidation {

   create(req, res, next) {
      const gallery_schema = Joi.object({
         cat_id: Joi.number().min(1).required(),
         gal_type: Joi.string().valid('C', 'W').max(1).required(),
         gal_title: Joi.string().min(1).required(),
         gal_image: Joi.string().min(1).required(),
         gal_pos: Joi.number().min(1).required(),
         gal_status: Joi.string().valid('Y', 'N', 'D').max(1).required(),
         gal_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, gallery_schema)
   }

   update(req, res, next) {
      const gallery_schema = Joi.object({
         cat_id: Joi.number().min(1),
         gal_type: Joi.string().valid('C', 'W').max(1),
         gal_title: Joi.string().min(1),
         gal_image: Joi.string().min(1),
         gal_pos: Joi.number().min(1),
         gal_status: Joi.string().valid('Y', 'N', 'D').max(1),
         gal_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, gallery_schema)
   }
}

module.exports = new GalleryValidation();
