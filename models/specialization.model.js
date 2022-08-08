//-------------------------- Specialization Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Specialization = sequelize.define(
      "Specialization",
      {
         speclz_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         qual_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         speclz_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         speclz_slug: {
            type: DataTypes.STRING,
            allowNull: false
         },
         speclz_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         speclz_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: false, tableName: "tbl__specialization" }
   );
   return Specialization;
};

//-------------------------- Specialization Model End ------------------------------//
