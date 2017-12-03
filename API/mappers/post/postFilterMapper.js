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

module.exports = postFilterMapper