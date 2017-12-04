var Topic = require('../../models/topicSchema')

var topicMapper = {}

topicMapper.convertRequest = function(topicRequest) {
    var result = new Topic()
    result.name = topicRequest.name

    return result
}

module.exports = topicMapper