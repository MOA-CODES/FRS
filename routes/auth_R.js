const express = require('express')
const router = express.Router()

const {register, login} = require('../controller/auth_C')

router.post('/login', login)
router.post('/register', register)

module.exports = router