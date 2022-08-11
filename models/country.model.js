//-------------------------- Country Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Country = sequelize.define(
      "Country",
      {
         country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         iso: {
            type: DataTypes.STRING,
            allowNull: false
         },
         country_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         country_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         nicename: {
            type: DataTypes.STRING,
            allowNull: false
         },
         iso3: {
            type: DataTypes.STRING,
            allowNull: false
         },
         numcode: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         phonecode: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         country_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         foot_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__country" }
   );
   return Country;
};

//-------------------------- Country Model End ------------------------------//
