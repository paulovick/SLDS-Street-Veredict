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
    TOPICS_REQUEST_TOPICS,
    TOPICS_RECEIVE_TOPICS,
    REQUEST_TOPIC_DELETE,
    RECEIVE_TOPIC_DELETE
} from '../actions/topicsActions'
import { ROOT_ERROR } from '../../Root/actions';

function topicList(
    state = {
        isFetching: false,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1,
        error: null,
        success: null
    },
    action
) {
    switch(action.type) {
        case TOPICS_REQUEST_TOPICS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case TOPICS_RECEIVE_TOPICS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.topics
            })
        case REQUEST_TOPIC_DELETE:
            return Object.assign({}, state, {
                isBeingDeleted: action.topicId,
                isDeleted: -1
            })
        case RECEIVE_TOPIC_DELETE:
            return Object.assign({}, state, {
                items: state.items.filter((topic) => topic.id !== action.topicId),
                isBeingDeleted: -1,
                isDeleted: action.topicId,
                success: action.success
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                isBeingDeleted: -1,
                isDeleted: -1
            })
        default:
            return state
    }
}

const topicsReducer = combineReducers({
    topicList
})

export default topicsReducer