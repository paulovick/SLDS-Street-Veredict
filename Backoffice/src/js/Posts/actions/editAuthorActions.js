import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './authorContentActions'

export const EDIT_AUTHOR_FETCH_REQUEST = 'EDIT_AUTHOR_FETCH_REQUEST'
export const EDIT_AUTHOR_FETCH_RECEIVE = 'EDIT_AUTHOR_FETCH_RECEIVE'

export const EDIT_AUTHOR_EDIT_REQUEST = 'EDIT_AUTHOR_EDIT_REQUEST'
export const EDIT_AUTHOR_EDIT_RECEIVE = 'EDIT_AUTHOR_EDIT_RECEIVE'

function requestAuthor() {
    return {
        type: EDIT_AUTHOR_FETCH_REQUEST
    }
}

function receiveAuthor(json) {
    return {
        type: EDIT_AUTHOR_FETCH_RECEIVE,
        author: json
    }
}

export function fetchAuthor(authorId) {
    return function(dispatch) {
        dispatch(requestAuthor())
        $.ajax({
            url: `http://api.streetveredict.com/authors/${authorId}`,
            method: 'GET'
        })
        .done((json) => dispatch(receiveAuthor(json)))
        .fail((error) => dispatch(rootError('Error loading author')))
    }
}

function requestEditAuthor(json) {
    return {
        type: EDIT_AUTHOR_EDIT_REQUEST,
        json: json
    }
}

function receiveEditAuthor(json) {
    return {
        type: EDIT_AUTHOR_EDIT_RECEIVE,
        json: json
    }
}

export function editAuthorAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of author creation are invalid'))
            return
        }
        dispatch(requestEditAuthor(json))
        $.ajax({
            url: `http://api.streetveredict.com/authors/${json.id}`,
            method: 'PUT',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveEditAuthor(jsonReceived))
            dispatch(rootSuccess('Author updated successfully'))
        })
        .fail((error) => dispatch(rootError('Error updating author')))
    }
}