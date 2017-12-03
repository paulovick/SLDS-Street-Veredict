var Author = require('../../models/authorSchema')

var authorPostService = require('../../services/author/authorPostService')
var postFilterMapper = require('../post/postFilterMapper')

var authorMapper = {}

authorMapper.convertResponse = function(authorObj, callback) {
    var author = authorObj._doc
    var postQuery = {
        postIds: author.postIds
    }
    var postFilter = postFilterMapper.convertFilter(postQuery)
    authorPostService.getByFilter(postFilter, function(err, posts) {
        if (err) {
            callback(err)
            return
        }
        var postResponses = posts.map((post) => convertPostResponse(post))
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

        callback(null, result)
    })
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
        var results = authors.map((author) => {
            var postResponses = posts.filter((postResponse) => postResponse.authorId === author._id)
                                     .map((post) => convertPostResponse(post))
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
}

var convertPostResponse = function(postObj) {
    var post = postObj._doc
    var result = {
        id: post._id,
        type: post.type,
        createdAt: post.createdAt
    }

    if (post.type === 'full') {
        // Nothing
    } else if (post.type === 'link') {
        result.link = post.link
    }

    return result
}

module.exports = authorMapper