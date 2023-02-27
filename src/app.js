const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
require('./models/user')
require('./models/post')
// const bodyParser = require("body-parser");


// Middlewares
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(require("./routes/auth"))
app.use(require("./routes/post"))




module.exports = app;