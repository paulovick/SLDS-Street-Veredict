var Post = require('../../models/postSchema')
var postRequestMapper = require('../../mappers/post/postRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Post, postRequestMapper)

var postService = {}

postService.getAll = function(callback) {
    baseService.getAll(callback)
}

postService.getById = function(postId, callback) {
    baseService.getById(postId, callback)
}

postService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

postService.create = function(postRequest, callback) {
    baseService.create(postRequest, callback)
}

postService.update = function(postId, postRequest, callback) {
    baseService.update(postId, postRequest, callback)
}

postService.delete = function(postId, callback) {
    baseService.delete(postId, callback)
}

module.exports = postService