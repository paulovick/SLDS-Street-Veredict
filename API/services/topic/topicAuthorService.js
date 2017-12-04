var Author = require('../../models/authorSchema')
var authorRequestMapper = require('../../mappers/author/authorRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Author, authorRequestMapper)

var topicAuthorService = {}

topicAuthorService.getById = function(authorId, callback) {
    baseService.getById(authorId, callback)
}

topicAuthorService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

module.exports = topicAuthorService