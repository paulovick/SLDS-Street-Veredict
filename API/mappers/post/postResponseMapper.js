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


var Post = require('../../models/postSchema')

var postAuthorService = require('../../services/post/postAuthorService')
var authorFilterMapper = require('../author/authorFilterMapper')
var postTopicService = require('../../services/post/postTopicService')
var topicFilterMapper = require('../topic/topicFilterMapper')

var postResponseMapper = {}

postResponseMapper.convertResponse = function(postObj, callback) {
    postResponseMapper.convertResponses([postObj], function(err, postResponses) {
        if (err) {
            callback(err)
            return
        }
        if (postResponses.length === 0) {
            callback(null, [])
        }
        callback(null, postResponses[0])
    })
}

postResponseMapper.convertResponses = function(postObjs, callback) {
    var posts = postObjs.map((postObj) => postObj._doc)
    var authorIds = posts.map((post) => post.authorId)
    var authorQuery = {
        ids: authorIds
    }
    var authorFilter = authorFilterMapper.convertFilter(authorQuery)
    postAuthorService.getByFilter(authorFilter, function(err, authors) {
        if (err) {
            callback(err)
            return
        }
        var authorResponses = authors.map((author) => convertAuthorResponse(author))

        var topicIds = posts.map((post) => post.topicId)
        var topicQuery = {
            ids: topicIds
        }
        var topicFilter = topicFilterMapper.convertFilter(topicQuery)
        postTopicService.getByFilter(topicFilter, function(err, topics) {
            if (err) {
                callback(err)
                return
            }

            var topicResponses = topics.map((topic) => convertTopicResponse(topic))
            var results = posts.map((post) => {
                var authorResponse = authorResponses.filter((author) => author.id === post.authorId)[0]
                var topicResponse = topicResponses.filter((topic) => topic.id === post.topicId)[0]
                var result = {
                    id: post._id,
                    title: post.title,
                    type: post.type,
                    author: authorResponse,
                    topic: topicResponse,
                    createdAt: post.createdAt
                }
            
                if (post.type === 'full') {
                    result.content = post.content
                } else if (post.type === 'link') {
                    result.link = post.link
                }
    
                return result
            })
        
            callback(null, results)
        })
    })
}

var convertAuthorResponse = function(authorObj) {
    var author = authorObj._doc
    var result = {
        id: author._id,
        type: author.type,
        name: author.name,
        createdAt: author.createdAt
    }

    if (author.type === 'full') {
        // Nothing
    } else if (author.type === 'link') {
        result.link = author.link
    }

    return result
}

var convertTopicResponse = function(topicObj) {
    var topic = topicObj._doc
    var result = {
        id: topic._id,
        name: topic.name,
        createdAt: topic.createdAt
    }

    return result
}

module.exports = postResponseMapper