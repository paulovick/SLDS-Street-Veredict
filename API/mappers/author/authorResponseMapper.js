var Author = require('../../models/authorSchema')

var authorPostService = require('../../services/author/authorPostService')
var postFilterMapper = require('../post/postFilterMapper')
var authorTopicService = require('../../services/author/authorTopicService')
var topicFilterMapper = require('../topic/topicFilterMapper')

var authorMapper = {}

authorMapper.convertResponse = function(authorObj, callback) {
    authorMapper.convertResponses([authorObj], callback)
}

authorMapper.convertResponses = function(authorObjs, callback) {
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
                var postResponses = posts.filter((postResponse) => postResponse.authorId === author._id)
                var result = {
                    id: author._id,
                    type: author.type,
                    name: author.name,
                    posts: postResponses,
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

module.exports = authorMapper