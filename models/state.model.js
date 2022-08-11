//-------------------------- State Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const State = sequelize.define(
      "State",
      {
         state_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         country_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         state_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         country_code: {
            type: DataTypes.STRING,
            allowNull: false
         },
         state_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__state" }
   );
   return State;
};

//-------------------------- State Model End ------------------------------//
