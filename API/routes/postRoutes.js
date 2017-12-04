var express = require('express')
var router = express.Router()

var postService = require('../services/post/postService')
var postResponseMapper = require('../mappers/post/postResponseMapper')
var postFilterMapper = require('../mappers/post/postFilterMapper')

// MIDDLEWARES

router.use('/', (req, res, next) => {
    req.locals = {}
    req.locals.params = req.params
    req.locals.body = req.body
    req.locals.query = req.query

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
    var filter = postFilterMapper.convertFilter(req.locals.query)
    postService.getByFilter(filter, function(err, posts) {
        if (err) {
            res.status(500).send('Error getting posts')
            return
        }
        postResponseMapper.convertResponses(posts, function(err, postResponses) {
            if (err) {
                res.status(500).send('Error mapping posts')
                return
            }
            var result = {
                values: postResponses
            }
            res.json(result)
        })
    })
})

router.get('/:postId', (req, res) => {
    var postId = req.locals.params.postId
    
    postService.getById(postId, function(err, post) {
        if (err) {
            res.status(500).send('Error getting post with id {0}'.replace('{0}',postId))
            return
        }
        if (post === null) {
            res.status(404).send('Post not found')
            return
        }
        postResponseMapper.convertResponse(post, function(err, postResponse) {
            if (err) {
                res.status(500).send('Error getting post with id {0}'.replace('{0}',postId))
            }
            res.json(postResponse)
        })
    })
})

router.post('/', (req, res) => {
    var postRequest = req.locals.body
    
    postService.create(postRequest, function(err, post) {
        if (err) {
            res.status(500).send('Error creating post')
            return;
        }

        postResponseMapper.convertResponse(post, function(err, postResponse) {
            if (err) {
                res.status(500).send('Error creating post')
            }
            res.json(postResponse)
        })
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
        postResponseMapper.convertResponse(post, function(err, postResponse) {
            if (err) {
                res.status(500).send('Error mapping post')
                return
            }
            res.json(postResponse)
        })
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