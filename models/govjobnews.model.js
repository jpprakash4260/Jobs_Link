//-------------------------- GovernmentJobNews Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const GovernmentJobNews = sequelize.define(
      "GovernmentJobNews",
      {
         gnews_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         gnews_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gnews_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         gnews_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         gnews_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         gnews_date: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__govjobnews" }
   );
   return GovernmentJobNews;
};

//-------------------------- GovernmentJobNews Model End ------------------------------//
