const ChatRoute = require("express").Router()
const { chat_validate } = require("../../validators")
const { chatController } = require('../../controllers')

ChatRoute.post("/", chat_validate.create, chatController.create)
ChatRoute.get("/", chatController.get)
ChatRoute.get("/:chat_id", chatController.getByPk)
ChatRoute.post("/Details", chatController.getAdminDetails)
ChatRoute.put("/:chat_id", chat_validate.update, chatController.update)
ChatRoute.delete("/delete", chatController.delete)

module.exports = ChatRoute