const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users')

const app = express()

// bodyparser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// mongodb
const db = require('./config/keys').mongoURI

mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('Database connected'))
.catch(err => console.log(err))

// passport
app.use(passport.initialize())
require('./config/passport')(passport)

// routes
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App running on ${port}`))