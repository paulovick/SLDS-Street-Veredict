/*
This file is part of Street Veredict.

Street Veredict - An API/Website/Backoffice to share opinions on a given topic.
Copyright (C) 2017  Pau Torrents I Gallego - Eduard Maestro Martinez

Street Veredict is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Street Veredict is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Street Veredict program.  If not, see <https://www.gnu.org/licenses/>.
*/


var express = require('express')
var router = express.Router()

var topicService = require('../services/topic/topicService')
var topicResponseMapper = require('../mappers/topic/topicResponseMapper')
var topicFilterMapper = require('../mappers/topic/topicFilterMapper')

// MIDDLEWARES

router.use('/', (req, res, next) => {
    req.locals = {}
    req.locals.params = req.params
    req.locals.body = req.body
    req.locals.query = req.query

    next()
})

router.use('/:topicId', (req, res, next) => {
    req.locals.params.topicId = req.params.topicId

    if (typeof req.locals.params.topicId !== 'undefined' && req.locals.params.topicId !== null) {
        req.locals.params.topicId = parseInt(req.locals.params.topicId)
    }

    next()
})

// ROUTES

router.get('/', (req, res) => {
    var filter = topicFilterMapper.convertFilter(req.locals.query)
    topicService.getByFilter(filter, function(err, topics) {
        if (err) {
            res.status(500).send('Error getting topics')
            return
        }
        topicResponseMapper.convertResponses(topics, function(err, topicResponses) {
            if (err) {
                res.status(500).send('Error mapping topics')
                return
            }
            var result = {
                values: topicResponses
            }
            res.json(result)
        })
    })
})

router.get('/:topicId', (req, res) => {
    var topicId = req.locals.params.topicId
    
    topicService.getById(topicId, function(err, topic) {
        if (err) {
            res.status(500).send('Error getting topic with id {0}'.replace('{0}',topicId))
            return
        }
        if (topic === null) {
            res.status(404).send('Topic not found')
            return
        }
        topicResponseMapper.convertResponse(topic, function(err, topicResponse) {
            if (err) {
                res.status(500).send('Error getting topic with id {0}'.replace('{0}',topicId))
            }
            res.json(topicResponse)
        })
    })
})

router.post('/', (req, res) => {
    var topicRequest = req.locals.body
    
    topicService.create(topicRequest, function(err, topic) {
        if (err) {
            res.status(500).send('Error creating topic')
            return;
        }

        topicResponseMapper.convertResponse(topic, function(err, topicResponse) {
            if (err) {
                res.status(500).send('Error creating topic')
            }
            res.json(topicResponse)
        })
    })
})

router.put('/:postId', (req, res) => {
    var topicId = req.locals.params.topicId
    var topicRequest = req.locals.body
    topicService.update(topicId, topicRequest, function(err, topic) {
        if (err) {
            res.status(500).send('Error updating topic')
            return;
        }
        topicResponseMapper.convertResponse(topic, function(err, topicResponse) {
            if (err) {
                res.status(500).send('Error mapping topic')
                return
            }
            res.json(topicResponse)
        })
    })
})

router.delete('/:topicId', (req, res) => {
    var topicId = req.locals.params.topicId

    topicService.delete(topicId, function(err) {
        if (err) {
            res.status(500).send('Error deleting topic with id {0}'.replace('{0}', topicId))
            return;
        }

        res.send('Topic deleted')
    })
})

module.exports = router