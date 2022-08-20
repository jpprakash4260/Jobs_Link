const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class UnrestJobPost_ExpValidation {

   create(req, res, next) {
      const unrestjobpost_exp_schema = Joi.object({
         duplicate_from: Joi.string().min(1).required(),
         jcat_type: Joi.string().valid('M', 'S').max(1).required(),
         unrest_jcat: Joi.number().min(1).required(),
         unrest_jsubcat: Joi.number().min(1).required(),
         unrest_jcode: Joi.string().min(1).required(),
         verify: Joi.string().valid('Y', 'N').max(1).required(),
         unrest_jdesc: Joi.string().min(1).required(),
         unrest_jquali: Joi.string().min(1).required(),
         unrest_jrequ: Joi.string().min(1).required(),
         high_qualif: Joi.number().min(1).required(),
         high_course: Joi.number().min(1).required(),
         high_special: Joi.number().min(1).required(),
         unrest_jallow: Joi.string().min(1).required(),
         sal_id: Joi.number().min(1).required(),
         jtype_id: Joi.number().min(1).required(),
         jtype_id_new: Joi.string().min(1).required(),
         job_type: Joi.string().min(1).required(),
         key_skills: Joi.string().min(1).required(),
         job_exp: Joi.string().min(1).required(),
         country_id: Joi.number().min(1).required(),
         state: Joi.number().min(1).required(),
         unrest_jloct: Joi.number().min(1).required(),
         unrest_jcompany: Joi.string().min(1).required(),
         comp_detail: Joi.string().min(1).required(),
         unrest_jemail: Joi.string().min(1).required(),
         unrest_jphoneold: Joi.number().min(1).required(),
         unrest_jphone: Joi.string().min(1).required(),
         unrest_landline: Joi.string().min(1).required(),
         unrest_sal: Joi.string().min(1).required(),
         comp_address: Joi.string().min(1).required(),
         apply: Joi.string().min(1).required(),
         ip_address: Joi.string().min(1).required(),
         posted_id: Joi.number().min(1).required(),
         posted_by: Joi.string().min(1).required(),
         posted_name: Joi.string().min(1).required(),
         posted_pos: Joi.number().min(1).required(),
         exp_date: Joi.date().raw().required(),
         posted_status: Joi.string().valid('Y', 'N', 'D', 'W', 'C').max(1).required(),
         comp_website: Joi.string().min(1).required(),
         field_exp: Joi.string().min(1).required(),
         nationality: Joi.number().min(1).required(),
         no_of_openings: Joi.string().min(1).required(),
         gender: Joi.string().min(1).required(),
         posted_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, unrestjobpost_exp_schema)
   }

   update(req, res, next) {
      const unrestjobpost_exp_schema = Joi.object({
         duplicate_from: Joi.string().min(1),
         jcat_type: Joi.string().valid('M', 'S').max(1),
         unrest_jcat: Joi.number().min(1),
         unrest_jsubcat: Joi.number().min(1),
         unrest_jcode: Joi.string().min(1),
         verify: Joi.string().valid('Y', 'N').max(1),
         unrest_jdesc: Joi.string().min(1),
         unrest_jquali: Joi.string().min(1),
         unrest_jrequ: Joi.string().min(1),
         high_qualif: Joi.number().min(1),
         high_course: Joi.number().min(1),
         high_special: Joi.number().min(1),
         unrest_jallow: Joi.string().min(1),
         sal_id: Joi.number().min(1),
         jtype_id: Joi.number().min(1),
         jtype_id_new: Joi.string().min(1),
         job_type: Joi.string().min(1),
         key_skills: Joi.string().min(1),
         job_exp: Joi.string().min(1),
         country_id: Joi.number().min(1),
         state: Joi.number().min(1),
         unrest_jloct: Joi.number().min(1),
         unrest_jcompany: Joi.string().min(1),
         comp_detail: Joi.string().min(1),
         unrest_jemail: Joi.string().min(1),
         unrest_jphoneold: Joi.number().min(1),
         unrest_jphone: Joi.string().min(1),
         unrest_landline: Joi.string().min(1),
         unrest_sal: Joi.string().min(1),
         comp_address: Joi.string().min(1),
         apply: Joi.string().min(1),
         ip_address: Joi.string().min(1),
         posted_id: Joi.number().min(1),
         posted_by: Joi.string().min(1),
         posted_name: Joi.string().min(1),
         posted_pos: Joi.number().min(1),
         exp_date: Joi.date().raw(),
         posted_status: Joi.string().valid('Y', 'N', 'D', 'W', 'C').max(1),
         comp_website: Joi.string().min(1),
         field_exp: Joi.string().min(1),
         nationality: Joi.number().min(1),
         no_of_openings: Joi.string().min(1),
         gender: Joi.string().min(1),
         posted_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, unrestjobpost_exp_schema)
   }
}

module.exports = new UnrestJobPost_ExpValidation();
