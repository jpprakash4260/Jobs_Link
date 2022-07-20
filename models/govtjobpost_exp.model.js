//-------------------------- GovernmentJobPostExp Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const GovernmentJobPostExp = sequelize.define(
      "GovernmentJobPostExp",
      {
         unrst_jid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         duplicate_from: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         jcat_type: {
            type: DataTypes.ENUM,
            values: ["M", "S"],
            defaultValue: null
         },
         unrest_jcat: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_jsubcat: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_jcode: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         unrest_jname: {
            type: DataTypes.STRING
         },
         unrest_jdesc: {
            type: DataTypes.STRING
         },
         unrest_jeducat: {
            type: DataTypes.STRING
         },
         unrest_jquali: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         quali_type: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         qualif_txt: {
            type: DataTypes.STRING
         },
         age_limit: {
            type: DataTypes.STRING
         },
         job_detail: {
            type: DataTypes.STRING
         },
         unrest_jrequ: {
            type: DataTypes.STRING
         },
         unrest_jallow: {
            type: DataTypes.STRING
         },
         job_type: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         key_skills: {
            type: DataTypes.STRING
         },
         job_exp: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         country_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         state: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_jloct: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_jcompany: {
            type: DataTypes.STRING
         },
         unrest_jemail: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         unrest_jphone: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_sal: {
            type: DataTypes.STRING
         },
         web_url: {
            type: DataTypes.STRING
         },
         sec_title: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         all_india: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         statename: {
            type: DataTypes.STRING
         },
         cityname: {
            type: DataTypes.STRING
         },
         no_of_openings: {
            type: DataTypes.STRING
         },
         sec_jobtitle: {
            type: DataTypes.STRING
         },
         apply: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         ip_address: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         posted_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         posted_by: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         posted_name: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         posted_pos: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         exp_date: {
            type: DataTypes.DATE,
            defaultValue: null
         },
         posted_status: {
            type: DataTypes.ENUM,
            values: ["W", "Y", "N", "D", "C"],
            defaultValue: null
         },
         posted_date: {
            type: DataTypes.DATE,
            defaultValue: null
         },
         posted_lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__govtjobpost_exp" }
   );
   return GovernmentJobPostExp;
};

//-------------------------- GovernmentJobPostExp Model End ------------------------------//
