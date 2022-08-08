//-------------------------- ContactResume Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const ContactResume = sequelize.define(
      "ContactResume",
      {
         cont_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
         },
         emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         comp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         cont_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['C', 'S']
         },
         cont_date: {
            type: DataTypes.DATE,
            allowNull: false
         },
         ipaddress: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         },
      },
      { timestamps: false, tableName: "tbl__contactresume" }
   );
   return ContactResume;
};

//-------------------------- ContactResume Model End ------------------------------//
