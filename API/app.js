var port = process.env.PORT || 3000

var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    next();
});

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