//-------------------------- Salary Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Salary = sequelize.define(
      "Salary",
      {
         sal_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         sal_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         sal_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         min_sal: {
            type: DataTypes.STRING,
            allowNull: false
         },
         max_sal: {
            type: DataTypes.STRING,
            allowNull: false
         },
         sal_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         sal_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         sal_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__salary" }
   );
   return Salary;
};

//-------------------------- Salary Model End ------------------------------//
