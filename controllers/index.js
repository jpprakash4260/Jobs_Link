const crudController = require('./crud.controller')
const loginRegisterController = require("./loginRegister.controller")
const seekerController = require("./seeker.controller")
const employerController = require("./employer.controller")
const adminController = require("./admin.controller")
const adminMenuController = require("./adminMenu.controller")
const accessKeyController = require("./accesskey.controller")
const campusController = require('./campus.controller')

module.exports = {
   accessKeyController,
   crudController,
   loginRegisterController,
   seekerController,
   employerController,
   adminController,
   adminMenuController,
   campusController
}