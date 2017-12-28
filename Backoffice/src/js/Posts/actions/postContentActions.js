import $ from 'jquery'
import { rootError } from '../../Root/actions'

export const POST_PROPERTY_MODIFIED = 'POST_PROPERTY_MODIFIED'
export const POST_JSON_VALIDATION_ERROR = 'POST_JSON_VALIDATION_ERROR'
export const POST_COMPONENT_RESET = 'POST_COMPONENT_RESET'

export const POST_AUTHORS_REQUEST = 'POST_AUTHORS_REQUEST'
export const POST_AUTHORS_RECEIVE = 'POST_AUTHORS_RECEIVE'

export function validateJson(json) {
    var result = null
    if (!json.name) {
        result = result || {}
        result.nameError = true
    }
    if (!json.type) {
        result = result || {}
        result.typeError = true
    }
    if (json.type) {
        if (json.type === 'full' && !json.content) {
            result = result || {}
            result.contentError = true
        } else if (json.type === 'link' && !json.link) {
            result = result || {}
            result.linkError = true
        }
    }
    return result
}

export function jsonValidationError(jsonValidation) {
    return {
        type: POST_JSON_VALIDATION_ERROR,
        validation: jsonValidation
    }
}

export function modifyPostProperty(originalPost, propertyName, newValue) {
    return {
        type: POST_PROPERTY_MODIFIED,
        originalPost: originalPost,
        propertyName: propertyName,
        newValue: newValue
    }
}

export function postComponentReset() {
    return {
        type: POST_COMPONENT_RESET
    }
}

function requestAuthors() {
    return {
        type: POST_AUTHORS_REQUEST
    }
}

function receiveAuthors(json) {
    return {
        type: POST_AUTHORS_RECEIVE,
        authors: json.values
    }
}

export function fetchAuthors() {
    return function(dispatch) {
        dispatch(requestAuthors())
        $.ajax({
            url: 'http://api.streetveredict.com/authors',
            method: 'GET'
        })
        .done((json) => dispatch(receiveAuthors(json)))
        .fail((error) => {
            console.log('Error receiving authors')
            dispatch(rootError('Error receiving authors'))
        })
    }
}