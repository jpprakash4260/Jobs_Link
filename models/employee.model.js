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
            allowNull: false
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
            allowNull: false
         },
         mobile_otp: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         mobile_verify: {
            type: DataTypes.ENUM,
            values: ["N", "Y"],
            allowNull: false
         },
         emp_dob: {
            type: DataTypes.DATE,
            allowNull: false
         },
         emp_gender: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_cat: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_subcat: {
            type: DataTypes.STRING,
            allowNull: false
         },
         cat_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         subcat_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_desig: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_typeval: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_comp: {
            type: DataTypes.STRING,
            allowNull: false
         },
         min_sal: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         sal_lakh: {
            type: DataTypes.STRING,
            allowNull: false
         },
         sal_thousands: {
            type: DataTypes.STRING,
            allowNull: false
         },
         exp_year: {
            type: DataTypes.STRING,
            allowNull: false
         },
         exp_month: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_photo: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_resumeheadline: {
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: false
         },
         high_qualif: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         high_course: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         high_special: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         high_college: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         colg_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         course_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         exp_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         high_pass_yr: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_resume: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_pincode: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_marital: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_address: {
            type: DataTypes.STRING,
            allowNull: false
         },
         user_type: {
            type: DataTypes.ENUM,
            values: ["E"],
            allowNull: false
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         },
         emp_status: {
            type: DataTypes.ENUM,
            values: ["N", "Y", "D"],
            allowNull: false
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
      { timestamps: true, tableName: "tbl__employee" }
   );
   return Employee;
};

//-------------------------- Employee Model End ------------------------------//
