var express = require('express')
var router = express.Router()

var postService = require('../services/postService')

// MIDDLEWARES

router.use('/', (req, res, next) => {
    req.locals = {}
    req.locals.params = req.params
    req.locals.body = req.body

    next()
})

router.use('/:postId', (req, res, next) => {
    req.locals.params.postId = req.params.postId

    if (typeof req.locals.params.postId !== 'undefined' && req.locals.params.postId !== null) {
        req.locals.params.postId = parseInt(req.locals.params.postId)
    }

    next()
})

// ROUTES

router.get('/', (req, res) => {
    postService.getAll(function(err, posts){
        if (err) {
            res.status(500).send(err)
        }
        var result = {
            values: posts
        }
        res.json(result)
    })
})

router.get('/:postId', (req, res) => {
    var postId = req.locals.params.postId
    var filter = {
        id: postId
    }
    postService.getByFilter(filter, function(err, postResponse) {
        if (err) {
            res.status(500).send('Error getting post with id {0}'.replace('{0}',postId))
            return
        }
        res.json(postResponse)
    })
})

router.put('/:postId', (req, res) => {
    var postId = req.locals.params.postId
    var postRequest = req.locals.body
    postService.update(postId, postRequest, function(err, post) {
        if (err) {
            res.status(500).send('Error updating post')
            return;
        }
        res.json(post)
    })
})

router.post('/', (req, res) => {
    var postRequest = req.locals.body
    
    postService.create(postRequest, function(err, postResponse) {
        if (err) {
            res.status(500).send('Error creating post')
            return;
        }

        res.status(201).json(postResponse)
    })
})

router.delete('/:postId', (req, res) => {
    var postId = req.locals.params.postId

    postService.delete(postId, function(err) {
        if (err) {
            res.status(500).send('Error deleting post with id {0}'.replace('{0}', postId))
            return;
        }

        res.send('Post deleted')
    })
})

module.exports = router