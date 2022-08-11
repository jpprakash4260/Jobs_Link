//-------------------------- JobApplied Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const JobApplied = sequelize.define(
      "JobApplied",
      {
         applied_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         job_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         job_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         appl_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["W", "A", "C", "H", "R"],
            comment: 'W-Waiting , A-Reviewed , C-Contacting , H-Hired , R-Rejected'
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         },
         applied_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__jobapplied" }
   );
   return JobApplied;
};

//-------------------------- JobApplied Model End ------------------------------//
