var Post = require('../../models/postSchema')

var postAuthorService = require('../../services/post/postAuthorService')
var authorFilterMapper = require('../author/authorFilterMapper')

var postMapper = {}

postMapper.convertResponse = function(postObj, callback) {
    var post = postObj._doc
    postAuthorService.getById(post.authorId, function(err, author) {
        if (err) {
            callback(err)
            return
        }
        var authorResponse = convertAuthorResponse(author)
        var result = {
            id: post._id,
            title: post.title,
            type: post.type,
            author: authorResponse,
            createdAt: post.createdAt,
        }
    
        if (post.type === 'full') {
            result.content = post.content
        } else if (post.type === 'link') {
            result.link = post.link
        }
    
        callback(null, result)
    })
}

postMapper.convertResponses = function(postObjs, callback) {
    var posts = postObjs.map((postObj) => postObj._doc)
    var authorIds = posts.map((post) => post.authorId)
    var authorQuery = {
        authorIds: authorIds
    }
    var authorFilter = authorFilterMapper.convertFilter(authorQuery)
    postAuthorService.getByFilter(authorFilter, function(err, authors) {
        if (err) {
            callback(err)
            return
        }
        var authorResponses = authors.map((author) => convertAuthorResponse(author))
        var results = posts.map((post) => {
            var authorResponse = authorResponses.filter((author) => author.id === post.authorId)
            var result = {
                id: post._id,
                title: post.title,
                type: post.type,
                author: authorResponse,
                createdAt: createdAd
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

var convertAuthorResponse = function(authorObj) {
    var author = authorObj._doc
    var result = {
        id: author._id,
        type: author.type,
        name: author.name
    }

    if (author.type === 'full') {
        // Nothing
    } else if (author.type === 'link') {
        result.link = author.link
    }

    return result
}

module.exports = postMapper