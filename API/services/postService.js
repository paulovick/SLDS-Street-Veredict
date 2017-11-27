var Post = require('../models/postSchema')
var postMapper = require('../mappers/postMapper')

var postService = {}

postService.getAll = function(callback) {
    Post.find({}, function(err, posts){
        if (err) {
            callback(err)
            return
        }
        var result = posts.map((postObj) => {
            var post = postObj._doc
            var postResponse = postMapper.convertResponse(post)

            return postResponse
        })
        callback(null, result)
    })
}

postService.create = function(postRequest, callback) {
    getId(function(postId) {
        var post = postMapper.convertRequest(postRequest)
        post._id = postId
        post.save(function(err) {
            if (err) {
                callback(err)
                return
            }
            var postResponse = postMapper.convertResponse(post)
            callback(null, postResponse)
        })
    })
}

postService.update = function(postId, postRequest, callback) {
    var post = postMapper.convertRequest(postRequest)._doc
    post._id = postId
    var query = { '_id' : postId }
    Post.findOneAndUpdate(query, post, {upsert: true}, function(err, newPost) {
        if (err) {
            callback(err)
            return
        }
        callback(null, newPost)
    })
}

postService.delete = function(postId, callback) {
    Post.remove({ _id: postId }, function(err, post) {
        if (err) {
            callback(err)
            return
        }

        callback(null)
    })
}

var getId = function(callback) {
    Post.find({}).sort('_id').exec(function(err, members) {
        var id = 0
        for(var i = 0; i < members.length; i++) {
            if (members[i]._doc._id > id) {
                callback(id)
                break
            } else if (members[i]._doc._id === id) {
                id += 1
            }
        }
    })
}

module.exports = postService