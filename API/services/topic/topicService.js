var Topic = require('../../models/topicSchema')
var topicRequestMapper = require('../../mappers/topic/topicRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Topic, topicRequestMapper)

var topicService = {}

topicService.getAll = function(callback) {
    baseService.getAll(callback)
}

topicService.getById = function(topicId, callback) {
    baseService.getById(topicId, callback)
}

topicService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

topicService.create = function(topicRequest, callback) {
    baseService.create(topicRequest, callback)
}

topicService.update = function(topicId, topicRequest, callback) {
    baseService.update(topicId, topicRequest, callback)
}

topicService.delete = function(topicId, callback) {
    baseService.delete(topicId, callback)
}

module.exports = topicService