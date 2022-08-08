//-------------------------- AdminMenu Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const AdminMenu = sequelize.define(
      "AdminMenu",
      {
         menu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         menu_title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         menu_type: {
            type: DataTypes.STRING,
            allowNull: false
         },
         pid: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         menu_link: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         menu_icon: {
            type: DataTypes.STRING,
            allowNull: false
         },
         menu_home: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N"],
            defaultValue: 'N'
         },
         menu_pos: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         menu_status: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         menu_lastupdate: {
            type: DataTypes.DATE,
            default: null
         }
      },
      { timestamps: false, tableName: "tbl__adminmenu" }
   );
   return AdminMenu;
};

//-------------------------- AdminMenu Model End ------------------------------//
