const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cloudi = require('../config/cloudinary.config')
dotenv.config();

cloudinary.config({
   cloud_name: cloudi.cloud_name,
   api_key: cloudi.api_key,
   api_secret: cloudi.api_secret,
});

module.exports = cloudinary;