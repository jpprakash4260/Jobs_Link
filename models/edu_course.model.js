//-------------------------- EducationCourse Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const EducationCourse = sequelize.define(
      "EducationCourse",
      {
         ecat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         pid: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         ecatid_sub: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         ecat_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["M", "C", "S"]
         },
         ecat_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ecat_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ecat_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         ecat_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         ecat_dt: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'gcat_lastupdate', createdAt: false, tableName: "tbl__edu_course" }
   );
   return EducationCourse;
};

//-------------------------- EducationCourse Model End ------------------------------//
