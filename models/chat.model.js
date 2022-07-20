//-------------------------- Chat Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Chat = sequelize.define(
      "Chat",
      {
         chat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         job_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         applyid: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         chat_from: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         chat_fname: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         chat_ftype: {
            type: DataTypes.STRING,
            allowNull: false
         },
         chat_to: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         chat_tname: {
            type: DataTypes.STRING,
            allowNull: false
         },
         chat_ttype: {
            type: DataTypes.STRING,
            allowNull: false
         },
         chat_msg: {
            type: DataTypes.STRING,
            allowNull: false
         },
         chat_status: {
            type: DataTypes.ENUM,
            values: ["Y", "N", "D"],
            allowNull: false
         },
         chat_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         read_status: {
            type: DataTypes.ENUM,
            values: ["W", "Y"],
            allowNull: false
         },
         read_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         ipaddr: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: true, tableName: "tbl__chat" }
   );
   return Chat;
};

//-------------------------- Chat Model End ------------------------------//
