const {register} = require('../controller/auth_C')
const express = require('express')
const router = express.Router()

router.get('/register', register)

module.exports = router