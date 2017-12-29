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


import { combineReducers } from 'redux'
import {
    POST_PROPERTY_MODIFIED,
    POST_JSON_VALIDATION_ERROR,
    POST_COMPONENT_RESET,
    POST_AUTHORS_RECEIVE,
    POST_AUTHORS_REQUEST,
    POST_TOPICS_RECEIVE,
    POST_TOPICS_REQUEST,
    POST_AUTHORS_INITIALIZED,
    POST_TOPICS_INITIALIZED
} from '../actions/postContentActions'

function createOrEditPost(
    state = {
        postJson: null,
        validation: {},
        authors: null,
        topics: null,
        authorsInitialized: false,
        topicsInitialized: false
    },
    action
) {
    switch(action.type) {
        case POST_COMPONENT_RESET:
            return Object.assign({}, state, {
                postJson: null,
                validation: {},
                authors: null,
                topics: null,
                authorsInitialized: null,
                topicsInitialized: null
            })
        case POST_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                postJson: Object.assign({}, action.originalPost, {
                    [action.propertyName]: action.newValue
                })
            })
        case POST_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        case POST_AUTHORS_REQUEST:
            return Object.assign({}, state, {
                authors: null
            })
        case POST_AUTHORS_RECEIVE:
            return Object.assign({}, state, {
                authors: action.authors
            })
        case POST_TOPICS_REQUEST:
            return Object.assign({}, state, {
                topics: null
            })
        case POST_TOPICS_RECEIVE:
            return Object.assign({}, state, {
                topics: action.topics
            })
        case POST_AUTHORS_INITIALIZED:
            return Object.assign({}, state, {
                authorsInitialized: true
            })
        case POST_TOPICS_INITIALIZED:
            return Object.assign({}, state, {
                topicsInitialized: true
            })
        default:
            return state
    }
}

const postContentReducer = combineReducers({
    createOrEditPost
})

export default postContentReducer