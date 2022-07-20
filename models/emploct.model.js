//-------------------------- EmployeeLocation Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EmployeeLocation = sequelize.define(
      "EmployeeLocation",
      {
         emplocat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         emp_id: {
            type: DataTypes.INTEGER,
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
         locat_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "D"]
         },
         locat_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: true, tableName: "tbl__emploct" }
   );
   return EmployeeLocation;
};

//-------------------------- EmployeeLocation Model End ------------------------------//
