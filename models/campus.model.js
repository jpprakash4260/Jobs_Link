//-------------------------- Campus Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Campus = sequelize.define(
      "Campus",
      {
         camp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         notify: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         },
         camp_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         camp_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         camp_org: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         camp_venue: {
            type: DataTypes.STRING,
            allowNull: false
         },
         camp_logo: {
            type: DataTypes.STRING,
            allowNull: false
         },
         camp_qualif: {
            type: DataTypes.STRING,
            allowNull: false
         },
         camp_exp: {
            type: DataTypes.STRING,
            allowNull: false
         },
         notif_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         camp_status: {
            type: DataTypes.ENUM,
            values: ['Y', 'N', 'D'],
            allowNull: false
         },
         added_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__campus" }
   );
   return Campus;
};

//-------------------------- Campus Model End ------------------------------//
