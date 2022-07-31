//-------------------------- Admin Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "Admin",
        {
            admin_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            admin_name: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            admin_pass: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            admin_status: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            sitename: {
                type: DataTypes.STRING,
                defaultValue: null,
                unique: true
            },
            set_url: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            setting_fields: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            setting_operator: {
                type: DataTypes.ENUM,
                values: ['Y', 'N'],
                defaultValue: 'N'
            },
            setting_logo: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            setting_banner: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            type: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            explanation: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            lastupdate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: moment().format('Do MMMM YYYY, h:mm:ss a')
            }
        },
        { timestamps: false, tableName: "tbl_admin" }
    );
    return Admin;
};

//-------------------------- Admin Model End ------------------------------//
