require('dotenv').config()

const conn = require('./db/conn')
const express = require('express');
const app = express();

const port = process.env.PORT || 3031

app.get('/', (req, res) => {
    res.send('Friend Request System App')
})

conn()

app.listen(port, (req, res)=>{
    console.log(`listening on port ${port}`);
})