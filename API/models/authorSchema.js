var mongoose = require('mongoose')

var options = {
    useMongoClient: true
}
mongoose.connect('mongodb://streetveredict:12345678@ds123136.mlab.com:23136/street-veredict', options)

var Schema = mongoose.Schema

var AuthorSchema = new Schema({
    _id: Number,
    type: String,
    name: String,
    postIds: [{ type: Number, ref: 'Post'}],
    createdAt: { type: Date, default: Date.now },
    
    // Author Full

    // Author Link
    link: String
}, {
    _id: false
})

module.exports = mongoose.model('Author', AuthorSchema)