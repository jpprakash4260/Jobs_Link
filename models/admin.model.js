//-------------------------- Admin Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Admin = sequelize.define(
      "Admin",
      {
         admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
         },
         admin_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         admin_pass: {
            type: DataTypes.STRING,
            allowNull: false
         },
         admin_status: {
            type: DataTypes.STRING,
            allowNull: false
         },
         sitename: {
            type: DataTypes.STRING,
            allowNull: false
         },
         set_url: {
            type: DataTypes.STRING,
            allowNull: false
         },
         setting_fields: {
            type: DataTypes.STRING,
            allowNull: false
         },
         setting_operator: {
            type: DataTypes.ENUM,
            values: ["Y", "N"],
            default: 'Y'
         },
         setting_logo: {
            type: DataTypes.STRING,
            allowNull: false
         },
         setting_banner: {
            type: DataTypes.STRING,
            allowNull: false
         },
         type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         explanation: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: false, tableName: "tbl__admin" }
   );
   return Admin;
};

//-------------------------- Admin Model End ------------------------------//
