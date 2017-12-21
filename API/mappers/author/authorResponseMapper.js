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


var Author = require('../../models/authorSchema')

var authorPostService = require('../../services/author/authorPostService')
var postFilterMapper = require('../post/postFilterMapper')
var authorTopicService = require('../../services/author/authorTopicService')
var topicFilterMapper = require('../topic/topicFilterMapper')

var authorResponseMapper = {}

authorResponseMapper.convertResponse = function(authorObj, callback) {
    authorResponseMapper.convertResponses([authorObj], function(err, authorResponses) {
        if (err) {
            callback(err)
            return
        }
        if (authorResponses.length === 0) {
            callback(null, [])
        }
        callback(null, authorResponses[0])
    })
}

authorResponseMapper.convertResponses = function(authorObjs, callback) {
    var authors = authorObjs.map((authorObj) => authorObj._doc)
    var postIds = Array.from(authors.map((author) => author.postIds))
    var postQuery = {
        postIds: postIds
    }
    var postFilter = postFilterMapper.convertFilter(postQuery)
    authorPostService.getByFilter(postFilter, function(err, posts) {
        if (err) {
            callback(err)
            return
        }
        convertPostResponses(posts, function(err, postResponses) {
            var results = authors.map((author) => {
                var authorPostResponses = postResponses.filter((postResponse) => postResponse.authorId === author._id)
                                            .map((postResponse) => {
                                                var result = cloneObject(postResponse)
                                                delete postResponse.authorId
                                                return result
                                            })
                var result = {
                    id: author._id,
                    type: author.type,
                    name: author.name,
                    posts: authorPostResponses,
                    createdAt: author.createdAt
                }
    
                if (author.type === 'full') {
                    // Nothing
                } else if (author.type === 'link') {
                    result.link = author.link
                }
    
                return result
            })
            callback(null, results)
        })
    })
}

var convertPostResponses = function(postObjs, callback) {
    var posts = postObjs.map((postObj) => postObj._doc)
    var topicQuery = {
        ids: posts.map((post) => post.topicId)
    }
    var topicFilter = topicFilterMapper.convertFilter(topicQuery)
    authorTopicService.getByFilter(topicFilter, function(err, topics) {
        if (err) {
            callback(err)
            return
        }

        var topicResponses = topics.map((topic) => convertTopicResponse(topic))
        var results = posts.map((post) => {
            var topicResponse = topicResponses.filter((topicResponse) => topicResponse.id === post.topicId)[0]
            var result = {
                id: post._id,
                title: post.title,
                type: post.type,
                authorId: post.authorId,
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

var cloneObject = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

module.exports = authorResponseMapper