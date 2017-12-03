var Author = require('../../models/authorSchema')
var authorRequestMapper = require('../../mappers/author/authorRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Author, authorRequestMapper)

var authorService = {}

authorService.getAll = function(callback) {
    baseService.getAll(callback)
}

authorService.getById = function(authorId, callback) {
    baseService.getById(authorId, callback)
}

authorService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

authorService.create = function(authorRequest, callback) {
    baseService.create(authorRequest, callback)
}

authorService.update = function(authorId, authorRequest, callback) {
    baseService.update(authorId, authorRequest, callback)
}

authorService.delete = function(authorId, callback) {
    baseService.delete(authorId, callback)
}

module.exports = authorService