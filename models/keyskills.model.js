//-------------------------- KeySkills Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const KeySkills = sequelize.define(
      "KeySkills",
      {
         keysk_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         keysk_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         keysk_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         keysk_code: {
            type: DataTypes.STRING,
            allowNull: false
         },
         keysk_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         keysk_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         keysk_dt: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'keysk_lastupdate', createdAt: false, tableName: "tbl__keyskills" }
   );
   return KeySkills;
};

//-------------------------- KeySkills Model End ------------------------------//
