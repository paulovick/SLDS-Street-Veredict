var Post = require('../../models/postSchema')

var postFilterMapper = {}

postFilterMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.title) {
        var title = query.title.replace('+', ' ')
        findElement.title = {
            '$regex': title
        }
    }

    var result = Post.find(findElement)
    
    if (query.ids) {
        var ids = []
        if (typeof query.ids === 'string') {
            ids = query.ids.split(',')
        } else {
            ids = query.ids
        }
        result = result.where('_id').in(ids)
    }

    if (query.authorIds) {
        var ids = []
        if (typeof query.authorIds === 'string') {
            ids = query.authorIds.split(',')
        } else {
            ids = query.authorIds
        }
        result = result.where('authorId').in(ids)
    }

    if (query.topicIds) {
        var ids = []
        if (typeof query.topicIds === 'string') {
            ids = query.topicIds.split(',')
        } else {
            ids = query.topicIds
        }
        result = result.where('topicId').in(ids)
    }

    if (query.type) {
        result = result.where('type').equals(query.type)
    }

    return result
}

module.exports = postFilterMapper