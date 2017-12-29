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
    POSTS_REQUEST_POSTS,
    POSTS_RECEIVE_POSTS,
    REQUEST_POST_DELETE,
    RECEIVE_POST_DELETE
} from '../actions/postsActions'
import { POST_FILTER_MODIFIED } from '../actions/postFilterActions'
import { ROOT_ERROR } from '../../Root/actions';

function postList(
    state = {
        isFetching: false,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1,
        filter: {}
    },
    action
) {
    switch(action.type) {
        case POSTS_REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case POSTS_RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts
            })
        case REQUEST_POST_DELETE:
            return Object.assign({}, state, {
                isBeingDeleted: action.postId,
                isDeleted: -1
            })
        case RECEIVE_POST_DELETE:
            return Object.assign({}, state, {
                items: state.items.filter((post) => post.id !== action.postId),
                isBeingDeleted: -1,
                isDeleted: action.postId
            })
        case POST_FILTER_MODIFIED:
            return Object.assign({}, state, {
                filter: Object.assign({}, action.filter, {
                    [action.field]: action.value
                })
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

const postsReducer = combineReducers({
    postList
})

export default postsReducer