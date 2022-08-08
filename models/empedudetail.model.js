//-------------------------- EmployeeEducationDetails Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EmployeeEducationDetails = sequelize.define(
      "EmployeeEducationDetails",
      {
         edu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
         emp_id: {
            type: DataTypes.INTEGER,
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
         high_pass_yr: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         edudate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__empedudetail" }
   );
   return EmployeeEducationDetails;
};

//-------------------------- EmployeeEducationDetails Model End ------------------------------//
