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

import topicsReducer from '../Topics/reducers/topicsReducer'
import topicContentReducer from '../Topics/reducers/topicContentReducer'
import createTopicReducer from '../Topics/reducers/createTopicReducer'
import editTopicReducer from '../Topics/reducers/editTopicReducer'

import authorsReducer from '../Authors/reducers/authorsReducer'
import authorContentReducer from '../Authors/reducers/authorContentReducer'
import createAuthorReducer from '../Authors/reducers/createAuthorReducer'
import editAuthorReducer from '../Authors/reducers/editAuthorReducer'

import postsReducer from '../Posts/reducers/postsReducer'
import postContentReducer from '../Posts/reducers/postContentReducer'
import createPostReducer from '../Posts/reducers/createPostReducer'
import editPostReducer from '../Posts/reducers/editPostReducer'

import {
    ROOT_SUCCESS,
    ROOT_ERROR
} from './actions'

function rootReducer(
    state = {
        success: null,
        error: null
    },
    action
) {
    switch(action.type) {
        case ROOT_SUCCESS:
            return Object.assign({}, state, {
                success: action.success
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                error: action.error
            })
        default:
            return state
    }
}

const reducers = combineReducers({
    rootReducer,
    topicsReducer,
    topicContentReducer,
    createTopicReducer,
    editTopicReducer,
    authorsReducer,
    authorContentReducer,
    createAuthorReducer,
    editAuthorReducer,
    postsReducer,
    postContentReducer,
    createPostReducer,
    editPostReducer
})

export default reducers