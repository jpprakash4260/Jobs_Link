//-------------------------- Enquiry Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
   const Enquiry = sequelize.define(
      "Enquiry",
      {
         enq_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            alloNull: false
         },
         enq_name: {
            type: DataTypes.STRING,
            alloNull: false
         },
         enq_email: {
            type: DataTypes.STRING,
            alloNull: false
         },
         enq_mobile: {
            type: DataTypes.INTEGER,
            alloNull: false
         },
         enq_msg: {
            type: DataTypes.STRING,
            alloNull: false
         },
         enq_date: {
            type: DataTypes.DATE,
            alloNull: false
         },
         ipaddress: {
            type: DataTypes.STRING,
            alloNull: false
         },
         lastupdate: {
            type: DataTypes.DATE,
            alloNull: false
         },
         enq_altmobile: {
            type: DataTypes.STRING,
            alloNull: false
         },
         maincat: {
            type: DataTypes.INTEGER,
            alloNull: false
         },
         type_home: {
            type: DataTypes.STRING,
            alloNull: false
         },
         type_bhk: {
            type: DataTypes.STRING,
            alloNull: false
         },
         enq_loc: {
            type: DataTypes.STRING,
            alloNull: false
         }
      },
      { timestamps: true, tableName: "tbl__enquiry" }
   );
   return Enquiry;
};

//-------------------------- Enquiry Model End ------------------------------//
