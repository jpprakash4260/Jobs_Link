//-------------------------- IndustryType Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const IndustryType = sequelize.define(
      "IndustryType",
      {
         indust_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         indust_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         indust_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         indust_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         indust_status: {
            type: DataTypes.ENUM,
            values: ["Y", "N", "D"],
            allowNull: false
         },
         indust_date: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__industrytype" }
   );
   return IndustryType;
};

//-------------------------- IndustryType Model End ------------------------------//
