'use strict'
const db = require("../Models")

class NotificationService { }

NotificationService.create = async (obj) => {
   try {
      const saved = await db.Notification.create(obj)
      return saved
   }
   catch (error) {
      return error
   }
}

NotificationService.findAllAndCount = async (notify_id) => {
   try {
      const findAllandCount = await db.Notification.findAndCountAll({ where: { notify_id: notify_id } })
      return findAllandCount
   }
   catch (err) {
      return err
   }
}

NotificationService.getCollegeDetails = async (notify_id, noti_status, _start, _limit) => {

   try {
      const [totalAccess] = await db.sequelize.query(
         `select 
                    COUNT(*) as total
                from 
                    tbl__notification as a 
                where 
                a.notify_id=${notify_id} and a.noti_status='${noti_status}'
            limit ${_limit} 
            OFFSET ${_start}`
      )
      return totalAccess[0].total
   } catch (error) {
      return error
   }
}

NotificationService.findByPk = async (notify_id) => {
   try {
      const findByPk = await db.Notification.findByPk(notify_id)
      return findByPk
   }
   catch (err) {
      return err
   }
}

NotificationService.update = async (notify_id, obj) => {
   try {

      const ext_Notification = await db.Notification.findOne({ where: obj })

      if (ext_Notification && notify_id == ext_Notification.notify_id) {

         return 'Exited Values'
      }
      else if (!ext_Notification || (ext_Notification && notify_id != ext_Notification.notify_id)) {

         const updateById = await db.Notification.update(obj, { where: { notify_id: notify_id } })
         return updateById[0]

      }
      else return 'Notification Not Found'
   }
   catch (err) {
      return err
   }
}

NotificationService.delete = async (notify_id) => {
   try {
      const founded = await db.Notification.findByPk(notify_id)
      if (founded) {
         const deleted = await db.Notification.destroy({ where: { notify_id: notify_id } })
         return deleted
      }
      else {
         return 'Access not found'
      }
   } catch (err) {
      return err
   }
}


module.exports = NotificationService