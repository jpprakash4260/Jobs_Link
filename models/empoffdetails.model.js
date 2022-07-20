//-------------------------- EmployeeOfficialDetails Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EmployeeOfficialDetails = sequelize.define(
      "EmployeeOfficialDetails",
      {
         wrk_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull : false
         },
         emp_desig: {
            type: DataTypes.STRING,
            allowNull : false
         },
         emp_org: {
            type: DataTypes.STRING,
            allowNull : false
         },
         cur_comp: {
            type: DataTypes.STRING,
            allowNull : false
         },
         exp_yr: {
            type: DataTypes.STRING,
            allowNull : false
         },
         exp_month: {
            type: DataTypes.STRING,
            allowNull : false
         },
         exp_yr_to: {
            type: DataTypes.STRING,
            allowNull : false
         },
         exp_month_to: {
            type: DataTypes.STRING,
            allowNull : false
         },
         sal_type: {
            type: DataTypes.STRING,
            allowNull : false
         },
         sal_lakhs: {
            type: DataTypes.STRING,
            allowNull : false
         },
         sal_thousand: {
            type: DataTypes.STRING,
            allowNull : false
         },
         emp_detail: {
            type: DataTypes.STRING,
            allowNull : false
         },
         wrk_status:{
            type: DataTypes.STRING,
            allowNull : false
         },
         wrk_date: {
            type: DataTypes.DATE,
            allowNull : false
         },
         lastupdate:{
            type:DataTypes.DATE,
            allowNull : false
         }
      },
      { timestamps: true, tableName: "tbl__empoffdetails" }
   );
   return EmployeeOfficialDetails;
};

//-------------------------- EmployeeOfficialDetails Model End ------------------------------//
