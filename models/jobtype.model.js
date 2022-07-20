//-------------------------- JobType Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const JobType = sequelize.define(
      "JobType",
      {
         jtype_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         jtype_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         jtype_status: {
            type: DataTypes.STRING,
            allowNull: false
         },
         jtype_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         jtype_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__jobtype" }
   );
   return JobType;
};

//-------------------------- JobType Model End ------------------------------//
