//-------------------------- RecutComp Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const RecutComp = sequelize.define(
      "RecutComp",
      {
         recut_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         comp_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         comp_slug: {
            type: DataTypes.STRING,
            default: null
         },
         mail_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         mobile_no: {
            type: DataTypes.STRING,
            allowNull: false
         },
         email_otp: {
            type: DataTypes.STRING,
            allowNull: false
         },
         email_verify: {
            type: DataTypes.ENUM,
            defaultValue: "N",
            values: ["N", "Y"]
         },
         mobile_otp: {
            type: DataTypes.STRING,
            allowNull: false
         },
         mobile_verify: {
            type: DataTypes.ENUM,
            defaultValue: "N",
            values: ["Y", "N"]
         },
         comp_logo: {
            type: DataTypes.STRING,
            default: null
         },
         comp_pass: {
            type: DataTypes.STRING,
            allowNull: false
         },
         cont_person: {
            type: DataTypes.STRING,
            allowNull: false
         },
         indust_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         recut_type: {
            type: DataTypes.ENUM,
            default: null,
            values: ["COMP", "CONS", "", ""]
         },
         country_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         state_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         city_id: {
            type: DataTypes.INTEGER,
            default: null
         },
         pincode: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_strength: {
            type: DataTypes.STRING,
            default: null
         },
         recut_desc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         facebook: {
            type: DataTypes.STRING,
            default: null
         },
         twitter: {
            type: DataTypes.STRING,
            default: null
         },
         linkedin: {
            type: DataTypes.STRING,
            default: null
         },
         google: {
            type: DataTypes.STRING,
            default: null
         },
         recut_status: {
            type: DataTypes.ENUM,
            defaultValue: "Y",
            values: ["W", "Y", "N", "D"]
         },
         user_type: {
            type: DataTypes.STRING,
            default: null
         },
         recut_address: {
            type: DataTypes.STRING,
            allowNull: false
         },
         recut_date: {
            type: DataTypes.DATE,
            default: null //Date.now().toString()
         },
         lastupdate: {
            type: DataTypes.DATE,
            default: null
         },
         ipaddress: {
            type: DataTypes.STRING,
            default: null
         }
      },
      { timestamps: false, tableName: "tbl__recutcomp" }
   );
   return RecutComp;
};

//-------------------------- RecutComp Model End ------------------------------//
