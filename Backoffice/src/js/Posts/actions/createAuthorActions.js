import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './authorContentActions'

export const CREATE_AUTHOR_CREATE_REQUEST = 'CREATE_AUTHOR_CREATE_REQUEST'
export const CREATE_AUTHOR_CREATE_RECEIVE = 'CREATE_AUTHOR_CREATE_RECEIVE'

function requestCreateAuthor(json) {
    return {
        type: CREATE_AUTHOR_CREATE_REQUEST,
        json: json
    }
}

function receiveCreateAuthor(json) {
    return {
        type: CREATE_AUTHOR_CREATE_RECEIVE,
        json: json
    }
}

export function createAuthorAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of author creation are invalid'))
            return
        }
        dispatch(requestCreateAuthor(json))
        $.ajax({
            url: 'http://api.streetveredict.com/authors',
            method: 'POST',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveCreateAuthor(jsonReceived))
            dispatch(rootSuccess('Author created successfully'))
        })
        .fail((error) => {
            dispatch(rootError('Error creating author'))
        })
    }
}