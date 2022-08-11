//-------------------------- UnrestJobPost Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const UnrestJobPost = sequelize.define(
      "UnrestJobPost",
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
            defaultValue: null,
            values: ["M", "S"]
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
         unrest_jquali: {
            type: DataTypes.STRING
         },
         unrest_jrequ: {
            type: DataTypes.STRING
         },
         high_qualif: {
            type: DataTypes.INTEGER,
            default: null
         },
         high_course: {
            type: DataTypes.INTEGER,
            default: null
         },
         high_special: {
            type: DataTypes.INTEGER,
            default: null
         },
         unrest_jallow: {
            type: DataTypes.STRING
         },
         sal_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         jtype_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         jtype_id_new: {
            type: DataTypes.STRING,
            default: null
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
            type: DataTypes.STRING,
            defaultValue: null
         },
         comp_detail: {
            type: DataTypes.STRING,
            allowNull: false
         },
         unrest_jemail: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         unrest_jphoneold: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         unrest_jphone: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         unrest_landline: {
            type: DataTypes.STRING,
            allowNull: false
         },
         unrest_sal: {
            type: DataTypes.STRING
         },
         comp_address: {
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
            type: DataTypes.DATEONLY,
            defaultValue: null
         },
         posted_status: {
            type: DataTypes.ENUM,
            defaultValue: null,
            values: ["W", "Y", "N", "D", "C"]
         },
         comp_website: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         field_exp: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         nationality: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         no_of_openings: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         gender: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         posted_date: {
            type: DataTypes.DATE,
            default: null
         }
      },
      { updatedAt: 'posted_lastupdate', createdAt: false, tableName: "tbl__unrestjobpost" }
   );
   return UnrestJobPost;
};

//-------------------------- UnrestJobPost Model End ------------------------------//
