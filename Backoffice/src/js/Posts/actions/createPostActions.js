import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './postContentActions'

export const CREATE_POST_CREATE_REQUEST = 'CREATE_POST_CREATE_REQUEST'
export const CREATE_POST_CREATE_RECEIVE = 'CREATE_POST_CREATE_RECEIVE'

function requestCreatePost(json) {
    return {
        type: CREATE_POST_CREATE_REQUEST,
        json: json
    }
}

function receiveCreatePost(json) {
    return {
        type: CREATE_POST_CREATE_RECEIVE,
        json: json
    }
}

export function createPostAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of post creation are invalid'))
            return
        }
        dispatch(requestCreatePost(json))
        $.ajax({
            url: 'http://api.streetveredict.com/posts',
            method: 'POST',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveCreatePost(jsonReceived))
            dispatch(rootSuccess('Post created successfully'))
        })
        .fail((error) => {
            dispatch(rootError('Error creating post'))
        })
    }
}