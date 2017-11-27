var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES

var postsRouter = require('./routes/postRoutes')
app.use('/posts', postsRouter)

app.listen(3000, () => {
    console.log("Listening to port 3000!")
})