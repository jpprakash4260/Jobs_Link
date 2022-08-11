//-------------------------- GovernmentLevel Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const GovernmentLevel = sequelize.define(
      "GovernmentLevel",
      {
         lev_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         lev_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lev_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         lev_status: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lev_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__govtlevel" }
   );
   return GovernmentLevel;
};

//-------------------------- GovernmentLevel Model End ------------------------------//
