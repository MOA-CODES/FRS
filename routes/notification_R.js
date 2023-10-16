const express = require('express')
const router = express.Router()

const {getAll_Notifications} = require('../controller/notification_C')

router.route('/').get(getAll_Notifications)

module.exports = router

