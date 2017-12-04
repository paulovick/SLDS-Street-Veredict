var port = process.env.PORT || 3000

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

app.listen(port, () => {
    console.log("Listening to port {0}!".replace('{0}',port))
})