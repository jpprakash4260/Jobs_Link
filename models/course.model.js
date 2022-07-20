//-------------------------- Course Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Course = sequelize.define(
      "Course",
      {
         course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         qual_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         course_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         course_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         course_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         course_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdatet: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__course" }
   );
   return Course;
};

//-------------------------- Course Model End ------------------------------//
