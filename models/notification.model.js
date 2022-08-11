//-------------------------- Notification Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Notification = sequelize.define(
      "Notification",
      {
         notify_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         noti_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         noti_msg: {
            type: DataTypes.STRING,
            allowNull: false
         },
         chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         noti_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["JOB", "CHAT"]
         },
         job_applyid: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         noti_from: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         noti_ftype: {
            type: DataTypes.STRING,
            allowNull: false
         },
         noti_to: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         noti_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         noti_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         noti_read: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"]
         }
      },
      { updatedAt: 'lastupdate', createdAt: false, tableName: "tbl__notification" }
   );
   return Notification;
};

//-------------------------- Notification Model End ------------------------------//
