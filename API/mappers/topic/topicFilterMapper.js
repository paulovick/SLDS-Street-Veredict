var Topic = require('../../models/topicSchema')

var topicFilterMapper = {}

topicFilterMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.name) {
        var name = query.name.replace('+', ' ')
        findElement.name = {
            '$regex': name
        }
    }

    var result = Topic.find(findElement)

    if (query.ids) {
        var ids = []
        if (typeof query.ids === 'string') {
            ids = query.ids.split(',')
        } else {
            ids = query.ids
        }
        result = result.where('_id').in(ids)
    }

    return result
}

module.exports = topicFilterMapper