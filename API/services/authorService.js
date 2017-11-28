var Author = require('../models/authorSchema')
var authorMapper = require('../mappers/authorMapper')

var baseService = require('./baseService')
baseService.init(Author, authorMapper)

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