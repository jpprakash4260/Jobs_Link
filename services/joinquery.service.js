'use strict'
const db = require("../Models")

class joinqueryService { }

joinqueryService.emploct = async (emp_id) => {
   try {

      const emploct = db.sequelize.query(`
      
      SELECT 
      
      a.emp_id as emp_id, 
      a.emp_name as emp_name, 
      b.country_name as country, 
      c.state_name as state, 
      d.city_name as city 
      
      FROM tbl__employee as a
      
      LEFT JOIN tbl__country as b 
      ON b.id = a.emp_country 
      
      LEFT JOIN tbl__state as c 
      ON a.emp_state = c.state_id AND a.emp_country = c.country_id 
      
      LEFT JOIN tbl__city as d 
      ON c.state_id = d.state_id AND a.emp_city = d.city_id AND a.city_name = d.city_name 
      
      where a.emp_id = '${emp_id}'
      
      `)

      return emploct
   }
   catch (error) {
      return error
   }
}

joinqueryService.empedudetail = async (emp_id) => {
   try {
      const empedudetail = db.sequelize.query(`

      SELECT 
            
      a.emp_id as emp_id,
      a.emp_name as name,
      ( SELECT qual_name FROM tbl__qualification WHERE qual_id = b.high_qualif ) as high_qualif,
      ( SELECT course_name FROM tbl__course WHERE course_id = b.high_course ) as high_course,
      ( SELECT speclz_name FROM tbl__specialization WHERE speclz_id = b.high_special ) as high_special,
      ( SELECT colg_name FROM tbl__colg WHERE colg_id = b.high_college ) as college_name

      FROM tbl__employee as a

      LEFT JOIN tbl__empedudetail as b
      ON a.emp_id = b.emp_id

      WHERE a.emp_id = '${emp_id}'

      `)
      return empedudetail
   }
   catch (error) {
      return error
   }
}

joinqueryService.employee_min_salary = async (emp_id) => {
   try {
      const employee_min_salary = db.sequelize.query(`

      SELECT 

      a.emp_id as emp_id,
      a.emp_name as emp_name,
      b.min_sal as min_sal,
      b.max_sal as max_sal

      FROM tbl__employee as a

      LEFT JOIN tbl__salary as b
      ON a.min_sal = b.sal_id

      WHERE a.emp_id = '${emp_id}'

      `)
      return employee_min_salary
   }
   catch (error) {
      return error
   }
}

joinqueryService.emp_get_all_details = async (emp_id) => {
   try{

      const [emp_get_all_details] = await db.sequelize.query(`

      SELECT 

      a.*

      /*

      a.emp_id as emp_id, 
      a.emp_name as emp_name, 
      b.country_name as country, 
      c.state_name as state, 
      d.city_name as city,
      e.high_qualif as high_qual,
      e.high_course as high_course,
      e.high_special as high_special,
      e.high_college as high_college,
      e.colg_name as college_name,
      f.min_sal as min_sal,
      f.max_sal as max_sal

      */

      FROM tbl__employee as a

      LEFT JOIN tbl__country as b 
      ON b.id = a.emp_country 
      
      LEFT JOIN tbl__state as c 
      ON a.emp_state = c.state_id and a.emp_country = c.country_id 
      
      LEFT JOIN tbl__city as d 
      ON c.state_id = d.state_id and a.emp_city = d.city_id and a.city_name = d.city_name 

      LEFT JOIN tbl__empedudetail as e
      ON a.emp_id = e.emp_id

      LEFT JOIN tbl__salary as f
      ON a.min_sal = f.sal_id


      WHERE a.emp_id = '${emp_id}'

      `)

      return emp_get_all_details
   }
   catch(error){
      return error
   }
}

joinqueryService.all_unrest_jobpost = async (emp_id) => {
   try{

      const [emp_get_all_details] = await db.sequelize.query(`

      SELECT 

      a.*

      /*

      a.emp_id as emp_id, 
      a.emp_name as emp_name, 
      b.country_name as country, 
      c.state_name as state, 
      d.city_name as city,
      e.high_qualif as high_qual,
      e.high_course as high_course,
      e.high_special as high_special,
      e.high_college as high_college,
      e.colg_name as college_name,
      f.min_sal as min_sal,
      f.max_sal as max_sal
      
      */

      FROM tbl__employee as a

      LEFT JOIN tbl__country as b 
      ON b.id = a.emp_country 
      
      LEFT JOIN tbl__state as c 
      ON a.emp_state = c.state_id and a.emp_country = c.country_id 
      
      LEFT JOIN tbl__city as d 
      ON c.state_id = d.state_id and a.emp_city = d.city_id and a.city_name = d.city_name 

      LEFT JOIN tbl__empedudetail as e
      ON a.emp_id = e.emp_id

      LEFT JOIN tbl__salary as f
      ON a.min_sal = f.sal_id


      WHERE a.emp_id = '${emp_id}'

      `)

      return emp_get_all_details
   }
   catch(error){
      return error
   }
}

joinqueryService.get_all_specialization = async (speclz_id) => {
   try {
      const specialization = db.sequelize.query(`

      SELECT 
      
      a.recut_id as recut_id, 
      a.comp_name as comp_name,
      b.indust_name as industy_name,
      c.country_name as country_name,
      d.state_name as state_name, 
      e.city_name as city_name
      
      FROM tbl__recutcomp as a
      
      LEFT JOIN tbl__industrytype as b
      ON b.indust_id = a.indust_id
      
      LEFT JOIN tbl__country as c
      ON c.id = a.country_id 
      
      LEFT JOIN tbl__state as d
      ON a.state_id = d.state_id AND a.country_id = d.country_id 
      
      LEFT JOIN tbl__city as e
      ON a.state_id = e.state_id AND a.city_id = e.city_id AND a.country_id = e.country_id
      
      WHERE a.recut_id = '${speclz_id}'

      `)
      return specialization
   }
   catch (error) {
      return error
   }
}




module.exports = joinqueryService