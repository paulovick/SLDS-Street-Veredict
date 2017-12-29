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
import { rootError } from '../../Root/actions'

export const POST_PROPERTY_MODIFIED = 'POST_PROPERTY_MODIFIED'
export const POST_JSON_VALIDATION_ERROR = 'POST_JSON_VALIDATION_ERROR'
export const POST_COMPONENT_RESET = 'POST_COMPONENT_RESET'

export const POST_AUTHORS_REQUEST = 'POST_AUTHORS_REQUEST'
export const POST_AUTHORS_RECEIVE = 'POST_AUTHORS_RECEIVE'

export const POST_TOPICS_REQUEST = 'POST_TOPICS_REQUEST'
export const POST_TOPICS_RECEIVE = 'POST_TOPICS_RECEIVE'

export const POST_AUTHORS_INITIALIZED = 'POST_AUTHORS_INITIALIZED'
export const POST_TOPICS_INITIALIZED = 'POST_TOPICS_INITIALIZED'

export function validateJson(json) {
    var result = null
    if (!json.title) {
        result = result || {}
        result.nameError = true
    }
    if (json.authorId === null) {
        result = result || {}
        result.authorError = true
    }
    if (json.topicId === null) {
        result = result || {}
        result.topicError = true
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

function requestTopics() {
    return {
        type: POST_TOPICS_REQUEST
    }
}

function receiveTopics(json) {
    return {
        type: POST_TOPICS_RECEIVE,
        topics: json.values
    }
}

export function fetchTopics() {
    return function(dispatch) {
        dispatch(requestTopics())
        $.ajax({
            url: 'http://api.streetveredict.com/topics',
            method: 'GET'
        })
        .done((json) => dispatch(receiveTopics(json)))
        .fail((error) => {
            console.log('Error receiving topics')
            dispatch(rootError('Error receiving topics'))
        })
    }
}

export function authorsInitializedAction() {
    return {
        type: POST_AUTHORS_INITIALIZED
    }
}

export function topicsInitializedAction() {
    return {
        type: POST_TOPICS_INITIALIZED
    }
}