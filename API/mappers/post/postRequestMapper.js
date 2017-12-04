var Post = require('../../models/postSchema')

var postMapper = {}

postMapper.convertRequest = function(postRequest) {
    var result = new Post()
    result.type = postRequest.type
    result.title = postRequest.title
    result.authorId = postRequest.authorId
    result.topicId = postRequest.topicId

    if (postRequest.type === 'full') {
        result.content = postRequest.content
    } else if (postRequest.type === 'link') {
        result.link = postRequest.link
    }

    return result
}

module.exports = postMapper