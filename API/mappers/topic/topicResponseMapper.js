
var Topic = require('../../models/topicSchema')

var topicPostService = require('../../services/topic/topicPostService')
var postFilterMapper = require('../post/postFilterMapper')
var topicAuthorService = require('../../services/topic/topicAuthorService')
var authorFilterMapper = require('../author/authorFilterMapper')

var topicResponseMapper = {}

topicResponseMapper.convertResponse = function(topicObj, callback) {
    topicResponseMapper.convertResponses([topicObj], callback)
}

topicResponseMapper.convertResponses = function(topicObjs, callback) {
    var topics = topicObjs.map((topicObj) => topicObj._doc)
    var topicIds = topics.map((topic) => topic._id)
    var postQuery = {
        topicIds: topicIds
    }
    var postFilter = postFilterMapper.convertFilter(postQuery)
    topicPostService.getByFilter(postFilter, function(err, posts) {
        if (err) {
            callback(err)
            return
        }
        convertPostResponses(posts, function(err, postResponses) {
            if (err) {
                callback(err)
                return
            }
            var results = topics.map((topic) => {
                var topicPostResponses = postResponses.filter((postResponse) => postResponse.topicId === topic._id)
                var result = {
                    id: topic._id,
                    name: topic.name,
                    posts: topicPostResponses,
                    createdAt: topic.createdAt
                }
                return result
            })
            callback(null, results)
        })
    })
}

var convertPostResponses = function(postObjs, callback) {
    var posts = postObjs.map((postObj) => postObj._doc)
    var authorQuery = {
        ids: posts.map((post) => post.authorId)
    }
    var authorFilter = authorFilterMapper.convertFilter(authorQuery)
    topicAuthorService.getByFilter(authorFilter, function(err, authors) {
        if (err) {
            callback(err)
            return
        }

        var authorResponses = authors.map((author) => convertAuthorResponse(author))
        var results = posts.map((post) => {
            var authorResponse = authorResponses.filter((authorResponse) => authorResponse.id === post.authorId)[0]
            var result = {
                id: post._id,
                title: post.title,
                type: post.type,
                author: authorResponse,
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

var convertAuthorResponse = function(authorObj, callback) {
    var author = authorObj._doc
    var result = {
        id: author._id,
        name: author.name,
        type: author.type,
        createdAt: author.createdAt
    }

    if (author.type === 'full') {
        // Nothing
    } else if (author.type === 'link') {
        result.link = author.link
    }

    return result
}

module.exports = topicResponseMapper