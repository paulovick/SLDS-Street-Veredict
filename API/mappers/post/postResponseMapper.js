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
                var authorResponse = authorResponses.filter((author) => author.id === post.authorId)
                var topicResponse = topicResponses.filter((topic) => topic.id === post.topicId)
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