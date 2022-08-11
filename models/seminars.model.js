//-------------------------- Seminars Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Seminars = sequelize.define(
      "Seminars",
      {
         semi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         semi_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         semi_org: {
            type: DataTypes.STRING,
            allowNull: false
         },
         semi_venue: {
            type: DataTypes.STRING,
            allowNull: false
         },
         notif_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         semi_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         added_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__seminars" }
   );
   return Seminars;
};

//-------------------------- Seminars Model End ------------------------------//
