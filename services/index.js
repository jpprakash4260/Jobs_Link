const accessKeyService = require('./accesskey.service')
const adminService = require('./admin.service')
const adminMenuService = require('./adminMenu.service')
const campusService = require('./campus.service')

const crudService = require('./crud.service')
const loginRegisterService = require("./loginRegister.service")
const seekerService = require("./seeker.service")
const employerService = require("./employer.service")

module.exports = {
   accessKeyService,
   adminService,
   adminMenuService,
   campusService,
   crudService,
   loginRegisterService,
   seekerService,
   employerService,
}
