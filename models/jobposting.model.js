//-------------------------- JobPosting Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const JobPosting = sequelize.define(
      "JobPosting",
      {
         job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         job_code: {
            type: DataTypes.STRING,
            allowNull: false
         },
         posted_by: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         jcat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         jsub_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         cont_mail: {
            type: DataTypes.STRING,
            allowNull: false
         },
         cont_mob: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         sal_range: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         indust_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         empl_type: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_educ: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_exp: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_specal: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         job_desc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         job_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["W", "Y", "N", "D"]
         },
         posted_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         job_expdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__jobposting" }
   );
   return JobPosting;
};

//-------------------------- JobPosting Model End ------------------------------//
