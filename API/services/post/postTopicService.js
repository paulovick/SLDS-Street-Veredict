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


var Topic = require('../../models/topicSchema')
var topicRequestMapper = require('../../mappers/topic/topicRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Topic, topicRequestMapper)

var topicPostService = {}

topicPostService.getById = function(topicId, callback) {
    baseService.getById(topicId, callback)
}

topicPostService.getByFilter = function(filter, callback) {
    baseService.getByFilter(filter, callback)
}

module.exports = topicPostService