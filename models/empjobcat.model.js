//-------------------------- EmployeeJobCategory Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EmployeeJobCategory = sequelize.define(
      "EmployeeJobCategory",
      {
         mjcat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         subcat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         mjcat_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         },
         mjcat_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__empjobcat" }
   );
   return EmployeeJobCategory;
};

//-------------------------- EmployeeJobCategory Model End ------------------------------//
