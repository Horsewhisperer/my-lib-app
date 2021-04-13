/**
 * Environment Variables
 */

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/**
 * Required Modules
 */

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')


// db tie-in
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',err => console.error(err))
db.once('open',() => console.log('Connected to Mongoose.'))

// Routes Includes
const indexRouter = require('./routes/index')

/**
 * View Engine and Folder Structure
 */

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

/**
 * Server Listening
 */

app.listen(process.env.PORT || 3000)