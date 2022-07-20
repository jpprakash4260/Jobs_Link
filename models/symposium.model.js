//-------------------------- Symposium Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Symposium = sequelize.define(
      "Symposium",
      {
         symp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         symp_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         symp_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         symp_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         symp_desc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         symp_venue: {
            type: DataTypes.STRING,
            allowNull: false
         },
         notif_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         symp_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         added_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__symposium" }
   );
   return Symposium;
};

//-------------------------- Symposium Model End ------------------------------//
