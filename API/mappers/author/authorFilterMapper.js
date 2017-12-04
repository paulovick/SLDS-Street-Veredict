var Author = require('../../models/authorSchema')

var authorFilterMapper = {}

authorFilterMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.name) {
        var name = query.name.replace('+', ' ')
        findElement.name = {
            '$regex': name
        }
    }

    var result = Author.find(findElement)

    if (query.ids) {
        var ids = []
        if (typeof query.ids === 'string') {
            ids = query.ids.split(',')
        } else {
            ids = query.ids
        }
        result = result.where('_id').in(ids)
    }

    if (query.type) {
        result = result.where('type').equals(query.type)
    }

    return result
}

module.exports = authorFilterMapper