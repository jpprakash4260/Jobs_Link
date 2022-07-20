//-------------------------- GcmRegister Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const GcmRegister = sequelize.define(
      "GcmRegister",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         user_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcm_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         device_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcm_status: {
            type: DataTypes.ENUM,
            values:["Y","N","D"],
            defaultValue: "Y",
         },
         gcm_dt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         gcm_lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__gcmregister" }
   );
   return GcmRegister;
};

//-------------------------- GcmRegister Model End ------------------------------//
