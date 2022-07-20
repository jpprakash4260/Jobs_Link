//-------------------------- AccessKey Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const AccessKey = sequelize.define(
      "AccessKey",
      {
         access_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         access_key: {
            type: DataTypes.STRING,
            allowNull: false
         },
         user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         user_type: {
            type: DataTypes.ENUM,
            values: ['J','E' ],
            comment: 'J-jobseeker, E-Employer',
            allowNull: false
         },
         access_status: {
            type: DataTypes.ENUM,
            values: ['Y', 'N', 'D'],
            allowNull: false
         },
         access_expdt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         access_dt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         access_ip: {
            type: DataTypes.STRING,
            allowNull: false
         },
         access_lastupdate: {
            type: DataTypes.DATE,
            allowNull:false
         }
      },
      { timestamps: true, tableName: "tbl__accessKey" }
   );
   return AccessKey;
};

//-------------------------- AccessKey Model End ------------------------------//
