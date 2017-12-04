var mongoose = require('mongoose')

var options = {
    useMongoClient: true
}
mongoose.connect('mongodb://streetveredict:12345678@ds123136.mlab.com:23136/street-veredict', options)

var Schema = mongoose.Schema

var TopicSchema = new Schema({
    _id: Number,
    name: String,
    createdAt: { type: Date, default: Date.now }
}, {
    _id: false
})

module.exports = mongoose.model('Topic', TopicSchema)