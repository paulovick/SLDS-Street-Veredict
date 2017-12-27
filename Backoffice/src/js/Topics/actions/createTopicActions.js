import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'

export const CREATE_TOPIC_CREATE_REQUEST = 'CREATE_TOPIC_CREATE_REQUEST'
export const CREATE_TOPIC_CREATE_RECEIVE = 'CREATE_TOPIC_CREATE_RECEIVE'

export const TOPIC_PROPERTY_MODIFIED = 'CREATE_TOPIC_PROPERTY_MODIFIED'
export const TOPIC_CREATE_JSON_VALIDATION_ERROR = 'TOPIC_CREATE_JSON_VALIDATION_ERROR'

function requestCreateTopic(json) {
    return {
        type: CREATE_TOPIC_CREATE_REQUEST,
        json: json
    }
}

function receiveCreateTopic(json) {
    return {
        type: CREATE_TOPIC_CREATE_RECEIVE,
        json: json,
        success: "Topic created sucessfully"
    }
}

function validateJson(json) {
    var result = null
    if (!json.name) {
        result = result || {}
        result.nameError = true
    }
    return result
}

function jsonValidationError(jsonValidation) {
    return {
        type: TOPIC_CREATE_JSON_VALIDATION_ERROR,
        validation: jsonValidation
    }
}

export function createTopicAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of topic creation are invalid'))
            return
        }
        dispatch(requestCreateTopic(json))
        $.ajax({
            url: 'http://api.streetveredict.com/topics',
            method: 'POST',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveCreateTopic(jsonReceived))
            dispatch(rootSuccess('Topic created successfully'))
        })
        .fail((error) => {
            dispatch(rootError('Error creating topic'))
        })
    }
}

export function modifyTopicProperty(originalTopic, propertyName, newValue) {
    return {
        type: TOPIC_PROPERTY_MODIFIED,
        originalTopic: originalTopic,
        propertyName: propertyName,
        newValue: newValue
    }
}