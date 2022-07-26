const { upload } = require('../middleware');

module.exports = {
    seeker_validate: require('./seeker.validator'),
    employer_validate: require("./employer.validator"),
    upload: require('./multer')
}