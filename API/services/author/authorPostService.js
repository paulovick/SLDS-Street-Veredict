var Post = require('../../models/postSchema')
var postRequestMapper = require('../../mappers/post/postRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Post, postRequestMapper)

var authorPostService = {}

authorPostService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

module.exports = authorPostService