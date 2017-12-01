
var baseService = function() {
    _this = {}

    var entitySchema = null
    var entityMapper = null

    _this.init = function(schema, mapper) {
        entitySchema = schema
        entityMapper = mapper
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
            if (err || entity === null) {
                callback(err)
                return
            }
            callback(null, entity)
        })
    }
    
    _this.getByFilter = function(filter, callback) {
        filter.exec(function(err, entities) {
            if (err || entities === null) {
                callback(err)
                return
            }
            callback(null, entities)
        })
    }
    
    _this.create = function(entityRequest, callback) {
        _this.getId(entitySchema, function(entityId) {
            var entity = entityMapper.convertRequest(entityRequest)
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
        var entity = entityMapper.convertRequest(entityRequest)._doc
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