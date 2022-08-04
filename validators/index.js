const { upload } = require('../middleware');

module.exports = {
    seeker_validate: require('./seeker.validator'),
    employer_validate: require("./employer.validator"),
    admin_validate: require('./admin.validator'),
    upload: require('./multer')
}