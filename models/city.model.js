//-------------------------- City Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const City = sequelize.define(
      "City",
      {
         city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         state_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         country_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         city_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         city_slug: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         city_code: {
            type: DataTypes.STRING,
            allowNull: false
         },
         city_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         city_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         foot_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: true, tableName: "tbl__city" }
   );
   return City;
};

//-------------------------- City Model End ------------------------------//
