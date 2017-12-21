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


var Post = require('../../models/postSchema')

var postFilterMapper = {}

postFilterMapper.convertFilter = function(query) {
    var findElement = {}

    if (query.title) {
        var title = query.title.replace('+', ' ')
        findElement.title = {
            '$regex': title
        }
    }

    var result = Post.find(findElement)
    
    if (query.ids) {
        var ids = []
        if (typeof query.ids === 'string') {
            ids = query.ids.split(',')
        } else {
            ids = query.ids
        }
        result = result.where('_id').in(ids)
    }

    if (query.authorIds) {
        var ids = []
        if (typeof query.authorIds === 'string') {
            ids = query.authorIds.split(',')
        } else {
            ids = query.authorIds
        }
        result = result.where('authorId').in(ids)
    }

    if (query.topicIds) {
        var ids = []
        if (typeof query.topicIds === 'string') {
            ids = query.topicIds.split(',')
        } else {
            ids = query.topicIds
        }
        result = result.where('topicId').in(ids)
    }

    if (query.type) {
        result = result.where('type').equals(query.type)
    }

    return result
}

module.exports = postFilterMapper