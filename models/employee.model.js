//-------------------------- Employee Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Employee = sequelize.define(
      "Employee",
      {
         emp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         emp_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_email: {
            type: DataTypes.STRING, 
            allowNull: false
         },
         mob_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '+91'
         },
         emp_mobile: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_pass: {
            type: DataTypes.STRING,
            allowNull: false
         },
         email_otp: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         email_verify: {
            type: DataTypes.ENUM,
            values: ["N", "Y"],
            defaultValue: "N",
            allowNull: false
         },
         mobile_otp: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         mobile_verify: {
            type: DataTypes.ENUM,
            values: ["N", "Y"],
            defaultValue: "N",
            allowNull: false
         },
         emp_dob: {
            type: DataTypes.DATE,
            default: null
         },
         emp_gender: {
            type: DataTypes.STRING,
            default: null
         },
         emp_cat: {
            type: DataTypes.STRING,
            default: null
         },
         emp_subcat: {
            type: DataTypes.STRING,
            default: null
         },
         cat_name: {
            type: DataTypes.STRING,
            default: null
         },
         subcat_name: {
            type: DataTypes.STRING,
            default: null
         },
         emp_desig: {
            type: DataTypes.STRING,
            default: null
         },
         emp_typeval: {
            type: DataTypes.STRING,
            default: null
         },
         emp_comp: {
            type: DataTypes.STRING,
            default: null
         },
         min_sal: {
            type: DataTypes.INTEGER,
            default: null
         },
         sal_lakh: {
            type: DataTypes.STRING,
            default: null
         },
         sal_thousands: {
            type: DataTypes.STRING,
            default: null
         },
         exp_year: {
            type: DataTypes.STRING,
            default: null
         },
         exp_month: {
            type: DataTypes.STRING,
            default: null
         },
         emp_photo: {
            type: DataTypes.STRING,
            default: null
         },
         emp_resumeheadline: {
            type: DataTypes.STRING,
            default: null
         },
         emp_country: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_state: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_city: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         city_name: {
            type: DataTypes.STRING,
            default: null
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
         high_college: {
            type: DataTypes.INTEGER,
            default: null
         },
         colg_name: {
            type: DataTypes.STRING,
            default: null
         },
         course_type: {
            type: DataTypes.STRING,
            default: null
         },
         exp_type: {
            type: DataTypes.STRING,
            default: null
         },
         high_pass_yr: {
            type: DataTypes.STRING,
            default: null
         },
         emp_resume: {
            type: DataTypes.STRING,
            default: null
         },
         emp_pincode: {
            type: DataTypes.STRING,
            default: null
         },
         emp_marital: {
            type: DataTypes.STRING,
            default: null
         },
         emp_address: {
            type: DataTypes.STRING,
            default: null
         },
         user_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["E"],
            defaultValue: 'E'
         },
         ipaddress: {
            type: DataTypes.STRING,
            default: null
         },
         emp_status: {
            type: DataTypes.ENUM,
            values: ["N", "Y", "D"],
            default: null
         },
         emp_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__employee" }
   );
   return Employee;
};

//-------------------------- Employee Model End ------------------------------//
