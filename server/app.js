const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
require('dotenv').config()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use('/images', express.static('./uploads'))
app.use(express.static(path.join(__dirname, 'public')))

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server up in port ${port}`)
})

const routers = require('./routes')
app.use('/api', routers)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

