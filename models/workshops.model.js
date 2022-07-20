//-------------------------- Workshops Model Start ------------------------------//

module.exports = (sequelize, DataTypes) => {
    const Workshops = sequelize.define(
        "Workshops",
        {
            work_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            work_title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            work_image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            work_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            work_venue: {
                type: DataTypes.STRING,
                allowNull: false
            },
            notif_link: {
                type: DataTypes.STRING,
                allowNull: false
            },
            work_status: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["Y", "N", "D"]
            },
            added_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            exp_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            lastupdate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            about: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { timestamps: true, tableName: "tbl__workshops" }
    );
    return Workshops;
};

//-------------------------- Workshops Model End ------------------------------//
