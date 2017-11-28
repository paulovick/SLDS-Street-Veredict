var entitySchema = null
var entityMapper = null

var baseService = {}

baseService.init = function(schema, mapper) {
    entitySchema = schema
    entityMapper = mapper
}

baseService.getAll = function(callback) {
    entitySchema.find({}, function(err, entities){
        if (err) {
            callback(err)
            return
        }
        var result = entities.map((entityObj) => {
            var entity = entityObj._doc
            var entityResponse = entityMapper.convertResponse(entity)

            return entityResponse
        })
        callback(null, result)
    })
}

baseService.getById = function(id, callback) {
    entitySchema.findOne({'_id':id}, function(err, entity) {
        if (err || entity === null) {
            callback(err)
            return
        }
        var entityResponse = entityMapper.convertResponse(entity)
        callback(null, entityResponse)
    })
}

baseService.getByFilter = function(filter, callback) {
    filter.exec(function(err, entities) {
        if (err || entities === null) {
            callback(err)
            return
        }
        var result = entities.map((entity) => entityMapper.convertResponse(entity))
        callback(null, result)
    })
}

baseService.create = function(entityRequest, callback) {
    baseService.getId(entitySchema, function(entityId) {
        var entity = entityMapper.convertRequest(entityRequest)
        entity._id = entityId
        entity.save(function(err) {
            if (err) {
                callback(err)
                return
            }
            var entityResponse = entityMapper.convertResponse(entity)
            callback(null, entityResponse)
        })
    })
}

baseService.update = function(entityId, entityRequest, callback) {
    var entity = entityMapper.convertRequest(entityRequest)._doc
    entity._id = entityId
    var query = { '_id' : entityId }
    entitySchema.findOneAndUpdate(query, entity, {upsert: true}, function(err, newEntity) {
        if (err) {
            callback(err)
            return
        }
        var result = entityMapper.convertResponse(newEntity)
        callback(null, result)
    })
}

baseService.delete = function(entityId, callback) {
    entitySchema.remove({ '_id': entityId }, function(err, entity) {
        if (err) {
            callback(err)
            return
        }

        callback(null)
    })
}

baseService.getId = function(schema, callback) {
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

module.exports = baseService