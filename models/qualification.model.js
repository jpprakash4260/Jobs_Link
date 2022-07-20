//-------------------------- Qualification Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Qualification = sequelize.define(
      "Qualification",
      {
         qual_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         qual_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         qual_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         qual_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         qual_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         qual_dt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__qualification" }
   );
   return Qualification;
};

//-------------------------- Qualification Model End ------------------------------//
