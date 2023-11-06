require('dotenv').config()
require('express-async-errors')

const express = require('express');
const morgan = require('morgan')
const conn = require('./db/conn')

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const auth = require('./middleware/authentication')

const auth_R = require('./routes/auth_R')
const noti_R = require('./routes/notification_R')
const req_R = require('./routes/request_R')


const app = express();

const port = process.env.PORT||3031

app.use(morgan('dev'))
app.use(express.json())//its needed to read json data and also use req.body all that

app.get('/', (req, res) => {
    res.send('Friend Request System App')
})

app.use('/api/v1/auth', auth_R)
app.use('/api/v1/user/notifications', auth, noti_R)

app.use(notFound)
app.use(errorHandler)

conn()

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})