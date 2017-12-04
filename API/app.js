var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES

var postsRouter = require('./routes/postRoutes')
app.use('/posts', postsRouter)

var authorsRouter = require('./routes/authorRoutes')
app.use('/authors', authorsRouter)

var topicsRouter = require('./routes/topicRoutes')
app.use('/topics', topicsRouter)

app.listen(8080, () => {
    console.log("Listening to port 8080!")
})