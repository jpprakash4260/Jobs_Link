const ConferenceRoute = require("express").Router()
const { conference_validate } = require("../../validators")
const { conferenceController } = require('../../controllers')

ConferenceRoute.post("/", conference_validate.create, conferenceController.create)
ConferenceRoute.get("/", conferenceController.get)
ConferenceRoute.get("/:conf_id", conferenceController.getByPk)
ConferenceRoute.post("/Details", conferenceController.getCollegeDetails)
ConferenceRoute.put("/:conf_id", conference_validate.update, conferenceController.update)
ConferenceRoute.delete("/delete", conferenceController.delete)

module.exports = ConferenceRoute



