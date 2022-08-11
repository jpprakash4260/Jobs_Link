//-------------------------- Gallery Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Gallery = sequelize.define(
      "Gallery",
      {
         gal_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         gal_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["C", "W"]
         },
         gal_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gal_image: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         gal_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         gal_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "n", "D"]
         },
         gal_date: {
            type: DataTypes.DATE,
            defaultValue: null
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__gallery" }
   );
   return Gallery;
};

//-------------------------- Gallery Model End ------------------------------//
