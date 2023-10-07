require('dotenv').config()
require('express-async-errors')

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const auth = require('./middleware/auth')

const conn = require('./db/conn')
const express = require('express');
const app = express();

const port = process.env.PORT || 3031

app.get('/', (req, res) => {
    res.send('Friend Request System App')
})

app.use(notFound)
app.use(errorHandler)

conn()

app.listen(port, (req, res)=>{
    console.log(`listening on port ${port}`);
})