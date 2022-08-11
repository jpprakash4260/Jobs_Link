//-------------------------- ResumeScore Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const ResumeScore = sequelize.define(
      "ResumeScore",
      {
         resume_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         resume_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         resume_fdesc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         resume_sdesc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         first_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         seo_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         seo_description: {
            type: DataTypes.STRING,
            allowNull: false
         },
         seo_keywords: {
            type: DataTypes.STRING,
            allowNull: false
         },
         second_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         resume_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__resumescore" }
   );
   return ResumeScore;
};

//-------------------------- ResumeScore Model End ------------------------------//
