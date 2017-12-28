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