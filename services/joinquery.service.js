'use strict'
const db = require("../Models")

class joinqueryService { }

joinqueryService.emploct = async (emp_id) => {
   try {
      // const JoinQuery = db.sequelize.query(`

      // SELECT 
      // a.*

      // FROM 
      // tbl__employee as a

      // LEFT JOIN tbl__emploct as b

      // ON a.emp_id = b.emp_id 

      // LEFT join tbl__country as c 

      // ON a.emp_country =c.country_id

      // where a.emp_id = '${emp_id}'

      // `)


      const JoinQuery = db.sequelize.query(`

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
ON a.emp_state = c.state_id and a.emp_country = c.country_id

LEFT join tbl__city as d 

ON c.state_id = d.state_id and a.emp_city = d.city_id and a.city_name = d.city_name

where a.emp_id = '${emp_id}'
      
      `)




      return JoinQuery
   }
   catch (error) {
      return error
   }
}

joinqueryService.empedudetail = async (emp_id) => {
   try {
      const JoinQuery = db.sequelize.query(`

      select 
 a.emp_id as emp_id,
 a.emp_name as name,
 b.high_qualif as high_qual,
 b.high_course as high_course,
 b.high_special as high_special,
 b.high_college as high_college,
 b.colg_name as college_name

from tbl__employee as a

left join tbl__empedudetail as b
on a.emp_id = b.emp_id

where a.emp_id = '${emp_id}'

      `)
      return JoinQuery
   }
   catch (error) {
      return error
   }
}


module.exports = joinqueryService