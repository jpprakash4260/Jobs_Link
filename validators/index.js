
module.exports = {
    access_validate: require("./access.validator"),
    admin_validate: require('./admin.validator'),
    adminMenu_validate: require('./adminMenu.validator'),
    campus_validate: require('./campus.validator'),
    chat_validate: require('./chat.validator'),



    seeker_validate: require('./seeker.validator'),
    employer_validate: require("./employer.validator"),
    upload: require('./multer')
}