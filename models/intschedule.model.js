//-------------------------- InterviewSchedule Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const InterviewSchedule = sequelize.define(
      "InterviewSchedule",
      {
         intsch_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         applied_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         mail_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         mail_content: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         },
         mail_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__intschedule" }
   );
   return InterviewSchedule;
};

//-------------------------- InterviewSchedule Model End ------------------------------//
