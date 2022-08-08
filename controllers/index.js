const accessKeyController = require("./accesskey.controller")
const adminController = require("./admin.controller")
const adminMenuController = require("./adminMenu.controller")
const campusController = require('./campus.controller')
const chatController = require('./chat.controller')


const crudController = require('./crud.controller')
const loginRegisterController = require("./loginRegister.controller")
const seekerController = require("./seeker.controller")
const employerController = require("./employer.controller")


module.exports = {
   accessKeyController,
   adminController,
   adminMenuController,
   campusController,
   chatController,

   crudController,
   loginRegisterController,
   seekerController,
   employerController

}