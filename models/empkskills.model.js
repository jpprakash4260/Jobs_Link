//-------------------------- EmployeeKeyskills Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EmployeeKeyskills = sequelize.define(
      "EmployeeKeyskills",
      {
         empkskil_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         keysk_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1
         },
         keysk_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         empkskil_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         empkskil_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: false, tableName: "tbl__empkskills" }
   );
   return EmployeeKeyskills;
};

//-------------------------- EmployeeKeyskills Model End ------------------------------//
