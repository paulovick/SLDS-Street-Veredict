var Post = require('../models/postSchema')

var postMapper = {}

postMapper.convertRequest = function(postRequest) {
    var result = new Post()
    result.type = postRequest.type
    result.title = postRequest.title

    if (postRequest.type === 'full') {
        result.author = postRequest.author
        result.content = postRequest.content
    } else if (postRequest.type === 'link') {
        result.source = postRequest.source
        result.link = postRequest.link
    }

    return result
}

postMapper.convertResponse = function(post) {
    var result = {
        id: post._id,
        title: post.title,
        type: post.type
    }

    if (post.type === 'full') {
        result.author = post.author
        result.content = post.content
    } else if (post.type === 'link') {
        result.source = post.source
        result.link = post.link
    }

    return result;
}

postMapper.convertFilter = function(filter) {
    var result = {
        _id: filter.id
    }
    return result
}

module.exports = postMapper