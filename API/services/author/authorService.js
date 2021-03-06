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


var Author = require('../../models/authorSchema')
var authorRequestMapper = require('../../mappers/author/authorRequestMapper')

var baseService = new require('../baseService')()
baseService.init(Author, authorRequestMapper)

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