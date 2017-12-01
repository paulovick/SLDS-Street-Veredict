var Post = require('../models/postSchema')

var authorService = require('../services/authorService')
var authorMapper = require('./authorMapper')

var postMapper = {}

postMapper.convertRequest = function(postRequest) {
    var result = new Post()
    result.type = postRequest.type
    result.title = postRequest.title
    result.authorId = postRequest.authorId

    if (postRequest.type === 'full') {
        result.content = postRequest.content
    } else if (postRequest.type === 'link') {
        result.link = postRequest.link
    }

    return result
}

postMapper.convertResponse = function(postObj, callback) {
    var post = postObj._doc
    authorService.getById(post.authorId, function(err, author) {
        var authorResponse = convertAuthorResponse(author)
        var result = {
            id: post._id,
            title: post.title,
            type: post.type,
            author: authorResponse
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
    var authorFilter = authorMapper.convertFilter(authorQuery)
    authorService.getByFilter(authorFilter, function(err, authors) {
        var authorResponses = authors.map((author) => convertAuthorResponse(author))
        var results = posts.map((post) => {
            var authorResponse = authorResponses.filter((author) => author.id === post.authorId)
            var result = {
                id: post._id,
                title: post.title,
                type: post.type,
                author: authorResponse
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

postMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.title) {
        var title = query.title.replace('+', ' ')
        findElement.title = {
            '$regex': title
        }
    }

    var result = Post.find(findElement)

    if (query.ids) {
        var ids = query.ids.split(',')
        result = result.where('_id').in(ids)
    }

    if (query.authorIds) {
        var ids = query.authorIds.split(',')
        result = result.where('authorId').in(ids)
    }

    if (query.type) {
        result = result.where('type').equals(query.type)
    }

    return result
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