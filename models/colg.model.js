//-------------------------- Colg Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Colg = sequelize.define(
      "College",
      {
         colg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
         },
         colg_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         colg_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         colg_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         colg_status: {
            type: DataTypes.ENUM,
            values: ['Y', 'N', 'D'],
            allowNull: false
         },
         colg_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__colg" }
   );
   return Colg;
};

//-------------------------- Colg Model End ------------------------------//
