import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './postContentActions'

export const EDIT_POST_FETCH_REQUEST = 'EDIT_POST_FETCH_REQUEST'
export const EDIT_POST_FETCH_RECEIVE = 'EDIT_POST_FETCH_RECEIVE'

export const EDIT_POST_EDIT_REQUEST = 'EDIT_POST_EDIT_REQUEST'
export const EDIT_POST_EDIT_RECEIVE = 'EDIT_POST_EDIT_RECEIVE'

function requestPost() {
    return {
        type: EDIT_POST_FETCH_REQUEST
    }
}

function receivePost(json) {
    return {
        type: EDIT_POST_FETCH_RECEIVE,
        post: json
    }
}

export function fetchPost(postId) {
    return function(dispatch) {
        dispatch(requestPost())
        $.ajax({
            url: `http://api.streetveredict.com/posts/${postId}`,
            method: 'GET'
        })
        .done((json) => dispatch(receivePost(json)))
        .fail((error) => dispatch(rootError('Error loading post')))
    }
}

function requestEditPost(json) {
    return {
        type: EDIT_POST_EDIT_REQUEST,
        json: json
    }
}

function receiveEditPost(json) {
    return {
        type: EDIT_POST_EDIT_RECEIVE,
        json: json
    }
}

export function editPostAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of post creation are invalid'))
            return
        }
        dispatch(requestEditPost(json))
        $.ajax({
            url: `http://api.streetveredict.com/posts/${json.id}`,
            method: 'PUT',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveEditPost(jsonReceived))
            dispatch(rootSuccess('Post updated successfully'))
        })
        .fail((error) => dispatch(rootError('Error updating post')))
    }
}