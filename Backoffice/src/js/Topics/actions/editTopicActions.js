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