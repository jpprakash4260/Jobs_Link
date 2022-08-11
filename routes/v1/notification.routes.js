const NotificationRoute = require("express").Router()
const { notification_validate } = require("../../validators")
const { notificationController } = require('../../controllers')

NotificationRoute.post("/", notification_validate.create, notificationController.create)
NotificationRoute.get("/", notificationController.get)
NotificationRoute.get("/:notify_id", notificationController.getByPk)
NotificationRoute.post("/Details", notificationController.getCollegeDetails)
NotificationRoute.put("/:notify_id", notification_validate.update, notificationController.update)
NotificationRoute.delete("/delete", notificationController.delete)

module.exports = NotificationRoute