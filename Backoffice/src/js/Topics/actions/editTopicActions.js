import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './topicContentActions'

export const EDIT_TOPIC_FETCH_REQUEST = 'EDIT_TOPIC_FETCH_REQUEST'
export const EDIT_TOPIC_FETCH_RECEIVE = 'EDIT_TOPIC_FETCH_RECEIVE'

export const EDIT_TOPIC_EDIT_REQUEST = 'EDIT_TOPIC_EDIT_REQUEST'
export const EDIT_TOPIC_EDIT_RECEIVE = 'EDIT_TOPIC_EDIT_RECEIVE'

function requestTopic() {
    return {
        type: EDIT_TOPIC_FETCH_REQUEST
    }
}

function receiveTopic(json) {
    return {
        type: EDIT_TOPIC_FETCH_RECEIVE,
        topic: json
    }
}

export function fetchTopic(topicId) {
    return function(dispatch) {
        dispatch(requestTopic())
        $.ajax({
            url: `http://api.streetveredict.com/topics/${topicId}`,
            method: 'GET'
        })
        .done((json) => dispatch(receiveTopic(json)))
        .fail((error) => dispatch(rootError('Error loading topic')))
    }
}

function requestEditTopic(json) {
    return {
        type: EDIT_TOPIC_EDIT_REQUEST,
        json: json
    }
}

function receiveEditTopic(json) {
    return {
        type: EDIT_TOPIC_EDIT_RECEIVE,
        json: json
    }
}

export function editTopicAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of topic creation are invalid'))
            return
        }
        dispatch(requestEditTopic(json))
        $.ajax({
            url: `http://api.streetveredict.com/topics/${json.id}`,
            method: 'PUT',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveEditTopic(jsonReceived))
            dispatch(rootSuccess('Topic updated successfully'))
        })
        .fail((error) => dispatch(rootError('Error updating topic')))
    }
}