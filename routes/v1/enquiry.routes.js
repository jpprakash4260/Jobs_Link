const EnquiryRoute = require("express").Router()
const { enquiry_validate } = require("../../validators")
const { enquiryController } = require('../../controllers')

EnquiryRoute.post("/", enquiry_validate.create, enquiryController.create)
EnquiryRoute.get("/", enquiryController.get)
EnquiryRoute.get("/:enq_id", enquiryController.getByPk)
EnquiryRoute.post("/Details", enquiryController.getCollegeDetails)
EnquiryRoute.put("/:enq_id", enquiry_validate.update, enquiryController.update)
EnquiryRoute.delete("/delete", enquiryController.delete)

module.exports = EnquiryRoute