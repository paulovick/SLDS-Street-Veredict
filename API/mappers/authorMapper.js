var Author = require('../models/authorSchema')

var authorMapper = {}

authorMapper.convertRequest = function(authorRequest) {
    var result = new Author()
    result.type = authorRequest.type
    result.name = authorRequest.name

    if (authorRequest.type === 'full') {
        // Nothing
    } else if (authorRequest.type === 'link') {
        result.link = authorRequest.link
    }

    return result
}

authorMapper.convertResponse = function(author) {
    var result = {
        id: author._id,
        type: author.type,
        name: author.name
    }

    if (author.type === 'full') {
        // Nothing
    } else if (author.type === 'link') {
        result.source = author.source
        result.link = author.link
    }

    return result;
}

authorMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.name) {
        var name = query.name.replace('+', ' ')
        findElement.name = {
            '$regex': name
        }
    }

    var result = Author.find(findElement)

    if (query.ids) {
        var ids = query.ids.split(',')
        result = result.where('_id').in(ids)
    }

    if (query.type) {
        result = result.where('type').equals(query.type)
    }

    return result
}

module.exports = authorMapper