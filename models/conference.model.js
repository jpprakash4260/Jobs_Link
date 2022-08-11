//-------------------------- Conference Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Conference = sequelize.define(
      "Conference",
      {
         conf_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         conf_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         conf_image: {
            type: DataTypes.STRING,
            allowNull: false
         },
         notif_link: {
            type: DataTypes.STRING,
            allowNull: false
         },
         start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         exp_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         dead_line: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         enq_email: {
            type: DataTypes.STRING,
            allowNull: false
         },
         conf_venue: {
            type: DataTypes.STRING,
            allowNull: false
         },
         conf_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         added_date: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__conference" }
   );
   return Conference;
};

//-------------------------- Conference Model End ------------------------------//
