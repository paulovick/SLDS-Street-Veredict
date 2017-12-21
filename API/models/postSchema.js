/*
This file is part of Street Veredict.

Street Veredict - An API/Website/Backoffice to share opinions on a given topic.
Copyright (C) 2017  Pau Torrents I Gallego - Eduard Maestro Martinez

Street Veredict is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Street Veredict is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Street Veredict program.  If not, see <https://www.gnu.org/licenses/>.
*/


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