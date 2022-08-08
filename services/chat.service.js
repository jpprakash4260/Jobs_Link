'use strict'
const db = require("../Models")
const moment = require('moment')


class CampusService { }

CampusService.create = async (obj) => {
   try {
      const saved = await db.Chat.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

CampusService.findAllAndCount = async (chat_id) => {
   try {
      const findAllandCount = await db.Chat.findAndCountAll({ where: { chat_id: chat_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

CampusService.getCampusDetails = async (chat_id, chat_status, _start, _limit) => {

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

CampusService.findByPk = async (chat_id) => {
   try {
      const findByPk = await db.Chat.findByPk(chat_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

CampusService.update = async (_id, obj) => {
   try {
      const founded = await db.Chat.findByPk(_id)
      if (founded) {

         let checked = 'same'

         for (let i = 0; i < Object.keys(obj).length; i++) {

            var exited_ = (founded[Object.keys(obj)[i]])
            var new_ = Object.values(obj)[i]

            if (new_ == exited_) {
               // console.error('same ==> ', Object.keys(obj)[i], " : ", exited_, ' == ', new_)
               continue
            } else {
               if (Object.keys(obj)[i] == 'lastupdate') {
                  continue
               }
               else {
                  checked = 'not same'
                  console.error('notsame : ', Object.keys(obj)[i], " : ", exited_, ' = ', new_)
                  break
               }
            }
         }
         if (checked == 'not same') {

            obj.lastupdate = moment().format()
            const updateById = await db.Chat.update(obj, { where: { chat_id: _id } })
            return updateById[0]

         }
         return 'Exited Values'
      }
      return 'Access Not Found'
   }
   catch (err) {
      return err
   }
}

CampusService.delete = async (chat_id) => {
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


module.exports = CampusService