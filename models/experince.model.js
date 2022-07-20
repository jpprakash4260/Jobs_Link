//-------------------------- Experince Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Experince = sequelize.define(
      "Experince",
      {
         exp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         exp_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         exp_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         exp_slug: {
            type: DataTypes.ENUM,
            values: ["Y", "N", "D"],
            allowNull: false
         },
         exp_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__experince" }
   );
   return Experince;
};

//-------------------------- Experince Model End ------------------------------//
