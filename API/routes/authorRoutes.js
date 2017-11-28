var express = require('express')
var router = express.Router()

var authorService = require('../services/authorService')
var authorMapper = require('../mappers/authorMapper')

// MIDDLEWARES

router.use('/', (req, res, next) => {
    req.locals = {}
    req.locals.params = req.params
    req.locals.body = req.body
    req.locals.query = req.query

    next()
})

router.use('/:authorId', (req, res, next) => {
    req.locals.params.authorId = req.params.authorId

    if (typeof req.locals.params.authorId !== 'undefined' && req.locals.params.authorId !== null) {
        req.locals.params.authorId = parseInt(req.locals.params.authorId)
    }

    next()
})

// ROUTES

router.get('/', (req, res) => {
    var filter = authorMapper.convertFilter(req.locals.query)
    authorService.getByFilter(filter, function(err, authors) {
        if (err) {
            res.status(500).send('Error getting authors')
            return
        }
        var result = {
            values: authors
        }
        res.json(result)
    })
})

router.get('/:authorId', (req, res) => {
    var authorId = req.locals.params.authorId
    
    authorService.getById(authorId, function(err, authorResponse) {
        if (err) {
            res.status(500).send('Error getting post with id {0}'.replace('{0}',authorId))
            return
        }
        res.json(authorResponse)
    })
})

router.post('/', (req, res) => {
    var authorRequest = req.locals.body
    
    authorService.create(authorRequest, function(err, authorResponse) {
        if (err) {
            res.status(500).send('Error creating author')
            return;
        }

        res.status(201).json(authorResponse)
    })
})

router.put('/:authorId', (req, res) => {
    var authorId = req.locals.params.authorId
    var authorRequest = req.locals.body
    authorService.update(authorId, authorRequest, function(err, authorResponse) {
        if (err) {
            res.status(500).send('Error updating author')
            return;
        }
        res.json(authorResponse)
    })
})

router.delete('/:authorId', (req, res) => {
    var authorId = req.locals.params.authorId

    authorService.delete(authorId, function(err) {
        if (err) {
            res.status(500).send('Error deleting author with id {0}'.replace('{0}', authorId))
            return;
        }

        res.send('Author deleted')
    })
})

module.exports = router