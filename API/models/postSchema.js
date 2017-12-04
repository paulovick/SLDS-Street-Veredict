var mongoose = require('mongoose')

var options = {
    useMongoClient: true
}
mongoose.connect('mongodb://streetveredict:12345678@ds123136.mlab.com:23136/street-veredict', options)

var Schema = mongoose.Schema

var PostSchema = new Schema({
    _id: Number,
    type: String,
    title: String,
    authorId: { type: Number, ref: 'Author' },
    topicId: { type: Number, ref: 'Topic' },
    createdAt: { type: Date, default: Date.now },
    
    // Post Full
    content: String,

    // Post Extended
    link: String
}, {
    _id: false
})

module.exports = mongoose.model('Post', PostSchema)