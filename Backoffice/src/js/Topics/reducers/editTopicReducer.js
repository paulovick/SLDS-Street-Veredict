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
    EDIT_TOPIC_FETCH_REQUEST,
    EDIT_TOPIC_FETCH_RECEIVE,
    EDIT_TOPIC_EDIT_REQUEST,
    EDIT_TOPIC_EDIT_RECEIVE
} from '../actions/editTopicActions'
import { TOPIC_PROPERTY_MODIFIED } from '../actions/topicContentActions'
import { ROOT_ERROR } from '../../Root/actions'

function editTopic(
    state = {
        isEditing: false,
        topic: null
    },
    action
) {
    switch(action.type) {
        case EDIT_TOPIC_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case EDIT_TOPIC_FETCH_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                topic: action.topic
            })
        case TOPIC_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                topic: null
            })
        case EDIT_TOPIC_EDIT_REQUEST:
            return Object.assign({}, state, {
                isEditing: true,
                topic: null,
            })
        case EDIT_TOPIC_EDIT_RECEIVE:
            return Object.assign({}, state, {
                isEditing: false,
                topic: action.json
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isEditing: false
            })
        default:
            return state
    }
}

const editTopicReducer = combineReducers({
    editTopic
})

export default editTopicReducer