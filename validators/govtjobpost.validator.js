const Joi = require('joi');

const BaseValidation = require("../middleware/baseValidation")

class CollegeValidation {

   create(req, res, next) {
      const govjobpost_schema = Joi.object({
         duplicate_from: Joi.number().min(1).required(),
         jcat_type: Joi.string().valid('M', 'S').max(1).required(),
         unrest_jcat: Joi.number().min(1).required(),
         unrest_jsubcat: Joi.number().min(1).required(),
         unrest_jcode: Joi.string().min(1).required(),
         unrest_jname: Joi.string().min(1).required(),
         unrest_jdesc: Joi.string().min(1).required(),
         unrest_jeducat: Joi.string().min(1).required(),
         unrest_jquali: Joi.number().min(1).required(),
         quali_type: Joi.string().min(1).required(),
         qualif_txt: Joi.string().min(1).required(),
         age_limit: Joi.string().min(1).required(),
         job_detail: Joi.string().min(1).required(),
         unrest_jrequ: Joi.string().min(1).required(),
         unrest_jallow: Joi.string().min(1).required(),
         job_type: Joi.string().min(1).required(),
         key_skills: Joi.string().min(1).required(),
         job_exp: Joi.string().min(1).required(),
         country_id: Joi.number().min(1).required(),
         state: Joi.number().min(1).required(),
         unrest_jloct: Joi.number().min(1).required(),
         unrest_jcompany: Joi.string().min(1).required(),
         unrest_jemail: Joi.string().min(1).required(),
         unrest_jphone: Joi.number().min(1).required(),
         unrest_sal: Joi.string().min(1).required(),
         web_url: Joi.string().min(1).required(),
         sec_title: Joi.string().min(1).required(),
         all_india: Joi.string().min(1).required(),
         statename: Joi.string().min(1).required(),
         cityname: Joi.string().min(1).required(),
         no_of_openings: Joi.string().min(1).required(),
         sec_jobtitle: Joi.string().min(1).required(),
         apply: Joi.string().min(1).required(),
         ip_address: Joi.string().min(1).required(),
         posted_id: Joi.number().min(1).required(),
         posted_by: Joi.string().min(1).required(),
         posted_name: Joi.string().min(1).required(),
         posted_pos: Joi.number().min(1).required(),
         exp_date: Joi.date().raw().required(),
         posted_status: Joi.string().valid('W', 'Y', 'N', 'D', 'C').max(1).required(),
         posted_date: Joi.date().raw().required()
      })

      return BaseValidation.validateBody(req, res, next, govjobpost_schema)
   }

   update(req, res, next) {
      const govjobpost_schema = Joi.object({
         duplicate_from: Joi.number().min(1),
         jcat_type: Joi.string().valid('M', 'S').max(1),
         unrest_jcat: Joi.number().min(1),
         unrest_jsubcat: Joi.number().min(1),
         unrest_jcode: Joi.string().min(1),
         unrest_jname: Joi.string().min(1),
         unrest_jdesc: Joi.string().min(1),
         unrest_jeducat: Joi.string().min(1),
         unrest_jquali: Joi.number().min(1),
         quali_type: Joi.string().min(1),
         qualif_txt: Joi.string().min(1),
         age_limit: Joi.string().min(1),
         job_detail: Joi.string().min(1),
         unrest_jrequ: Joi.string().min(1),
         unrest_jallow: Joi.string().min(1),
         job_type: Joi.string().min(1),
         key_skills: Joi.string().min(1),
         job_exp: Joi.string().min(1),
         country_id: Joi.number().min(1),
         state: Joi.number().min(1),
         unrest_jloct: Joi.number().min(1),
         unrest_jcompany: Joi.string().min(1),
         unrest_jemail: Joi.string().min(1),
         unrest_jphone: Joi.number().min(1),
         unrest_sal: Joi.string().min(1),
         web_url: Joi.string().min(1),
         sec_title: Joi.string().min(1),
         all_india: Joi.string().min(1),
         statename: Joi.string().min(1),
         cityname: Joi.string().min(1),
         no_of_openings: Joi.string().min(1),
         sec_jobtitle: Joi.string().min(1),
         apply: Joi.string().min(1),
         ip_address: Joi.string().min(1),
         posted_id: Joi.number().min(1),
         posted_by: Joi.string().min(1),
         posted_name: Joi.string().min(1),
         posted_pos: Joi.number().min(1),
         exp_date: Joi.date().raw(),
         posted_status: Joi.string().valid('W', 'Y', 'N', 'D', 'C').max(1),
         posted_date: Joi.date().raw()
      })

      return BaseValidation.validateBody(req, res, next, govjobpost_schema)
   }
}

module.exports = new CollegeValidation();
