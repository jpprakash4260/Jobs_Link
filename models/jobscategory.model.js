//-------------------------- JobsCategory Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const JobsCategory = sequelize.define(
      "JobsCategory",
      {
         jcat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         pid: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         jcat_name: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_slug: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_code: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_icon: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_desc: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_image: {
            type: DataTypes.STRING,
            defaultValue: null
         },
         jcat_pos: {
            type: DataTypes.INTEGER,
            defaultValue: null
         },
         jcat_status: {
            type: DataTypes.ENUM,
            defaultValue: null,
            values: ["Y", "N", "D"]
         },
         foot_status: {
            type: DataTypes.ENUM,
            defaultValue: null,
            values: ["Y", "N"]
         },
         jcat_dt: {
            type: DataTypes.DATE,
            defaultValue: null    
         },
         jcat_lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__jobscategory" }
   );
   return JobsCategory;
};

//-------------------------- JobsCategory Model End ------------------------------//
