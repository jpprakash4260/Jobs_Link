//-------------------------- GovernmentCategory Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const GovernmentCategory = sequelize.define(
      "GovernmentCategory",
      {
         gcat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         pid: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         gcat_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_code: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_icon: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_desc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gcat_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         gcat_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         foot_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         },
         gcat_dt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         gcat_lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__govcategory" }
   );
   return GovernmentCategory;
};

//-------------------------- GovernmentCategory Model End ------------------------------//
