var Topic = require('../../models/topicSchema')
var topicRequestMapper = require('../../mappers/topic/topicRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Topic, topicRequestMapper)

var topicPostService = {}

topicPostService.getById = function(topicId, callback) {
    baseService.getById(topicId, callback)
}

topicPostService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

module.exports = topicPostService