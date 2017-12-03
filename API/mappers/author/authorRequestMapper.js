var Author = require('../../models/authorSchema')

var authorMapper = {}

authorMapper.convertRequest = function(authorRequest) {
    var result = new Author()
    result.type = authorRequest.type
    result.name = authorRequest.name
    result.postIds = []

    if (authorRequest.type === 'full') {
        // Nothing
    } else if (authorRequest.type === 'link') {
        result.link = authorRequest.link
    }

    return result
}

module.exports = authorMapper