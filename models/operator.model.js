//-------------------------- Operator Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Operator = sequelize.define(
      "Operator",
      {
         op_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         op_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["O", "A"]
         },
         op_name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         op_uname: {
            type: DataTypes.STRING,
            allowNull: false
         },
         op_password: {
            type: DataTypes.STRING,
            allowNull: false
         },
         feat_id: {
            type: DataTypes.STRING,
            allowNull: false
         },
         op_dt: {
            type: DataTypes.DATE,
            allowNull: false
         },
         op_status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Y", "N", "D"]
         },
         lastupdate: {
            type: DataTypes.DATE,
            allowNull: false
         }
      },
      { timestamps: false, tableName: "tbl__operator" }
   );
   return Operator;
};

//-------------------------- Operator Model End ------------------------------//
