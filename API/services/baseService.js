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



var baseService = function() {
    _this = {}

    var entitySchema = null
    var entityRequestMapper = null

    _this.init = function(schema, requestMapper) {
        entitySchema = schema
        entityRequestMapper = requestMapper
    }
    
    _this.getAll = function(callback) {
        entitySchema.find({}, function(err, entities){
            if (err) {
                callback(err)
                return
            }
            callback(null, entities)
        })
    }
    
    _this.getById = function(entityId, callback) {
        entitySchema.findOne({'_id':entityId}, function(err, entity) {
            if (err) {
                callback(err)
                return
            }
            callback(null, entity)
        })
    }
    
    _this.getByFilter = function(filter, callback) {
        filter.exec(function(err, entities) {
            if (err) {
                callback(err)
                return
            }
            if (entities === null) {
                callback(null, [])
                return
            }
            callback(null, entities)
        })
    }
    
    _this.create = function(entityRequest, callback) {
        _this.getId(entitySchema, function(entityId) {
            var entity = entityRequestMapper.convertRequest(entityRequest)
            entity._id = entityId
            entity.save(function(err) {
                if (err) {
                    callback(err)
                    return
                }
                callback(null, entity)
            })
        })
    }
    
    _this.update = function(entityId, entityRequest, callback) {
        var entity = entityRequestMapper.convertRequest(entityRequest)._doc
        entity._id = entityId
        var query = { '_id' : entityId }
        entitySchema.findOneAndUpdate(query, entity, {upsert: true}, function(err, updatedEntity) {
            if (err) {
                callback(err)
                return
            }
            callback(null, updatedEntity)
        })
    }
    
    _this.delete = function(entityId, callback) {
        entitySchema.remove({ _id: entityId }, function(err, entity) {
            if (err) {
                callback(err)
                return
            }
    
            callback(null)
        })
    }
    
    _this.getId = function(schema, callback) {
        schema.find({}).sort('_id').exec(function(err, members) {
            var id = 0
            for(var i = 0; i < members.length; i++) {
                while (id < members[i]._doc._id) {
                    id += 1
                }
    
                if (id > members[i]._doc._id) {
                    callback(id)
                    return
                } else {
                    id += 1
                }
            }
            callback(id)
        })
    }

    return _this
}

module.exports = baseService