//-------------------------- Entrepreneurship Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Entrepreneurship = sequelize.define(
      "Entrepreneurship",
      {
         ent_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         ent_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         cond_by: {
            type: DataTypes.STRING,
            allowNull: false
         },
         start_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         ending_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         ent_venue: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ent_eligible: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ent_email: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ent_phone: {
            type: DataTypes.STRING,
            allowNull: false
         },
         ent_desc: {
            type: DataTypes.STRING,
            allowNull: false
         },
         notif_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         reg_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         close_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         ent_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         },
         added_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__entrepreneurship" }
   );
   return Entrepreneurship;
};

//-------------------------- Entrepreneurship Model End ------------------------------//
