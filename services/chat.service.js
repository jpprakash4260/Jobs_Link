'use strict'
const db = require("../Models")

class ChatService { }

ChatService.create = async (obj) => {
   try {
      const saved = await db.Chat.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

ChatService.findAllAndCount = async (chat_id) => {
   try {
      const findAllandCount = await db.Chat.findAndCountAll({ where: { chat_id: chat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

ChatService.getCampusDetails = async (chat_id, chat_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__chat as a 
                where 
                a.chat_id=${chat_id} and a.chat_status='${chat_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

ChatService.findByPk = async (chat_id) => {
   try {
      const findByPk = await db.Chat.findByPk(chat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

ChatService.update = async (chat_id, obj) => {
   try {

      const ext_chat = await db.Chat.findOne({ where: obj })

      if (ext_chat && chat_id == ext_chat.chat_id) {

         return 'Exited Values'
      }
      else if (!ext_chat || (ext_chat && chat_id != ext_chat.chat_id)) {

         const updateById = await db.Chat.update(obj, { where: { chat_id: chat_id } })
         return updateById[0]

      }
      else return 'Chat Not Found'
   }
   catch (err) {
      return err
   }
}

ChatService.delete = async (chat_id) => {
   try {
      const founded = await db.Chat.findByPk(chat_id)
      if (founded) {
         const deleted = await db.Chat.destroy({ where: { chat_id: chat_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = ChatService