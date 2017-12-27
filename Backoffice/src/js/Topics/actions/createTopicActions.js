import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './topicContentActions'

export const CREATE_TOPIC_CREATE_REQUEST = 'CREATE_TOPIC_CREATE_REQUEST'
export const CREATE_TOPIC_CREATE_RECEIVE = 'CREATE_TOPIC_CREATE_RECEIVE'

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