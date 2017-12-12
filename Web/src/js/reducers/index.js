import { combineReducers } from 'redux'
import {
    REQUEST_TOPICS,
    RECEIVE_TOPICS,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions'

function topicList(
    state = {
        isFetching: false,
        items: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_TOPICS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_TOPICS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.topics
            })
        default:
            return state
    }
}

function postList(
    state = {
        isFetching: false,
        topicId: 0,
        items: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                topicId: action.topicId,
                items: action.posts
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    topicList,
    postList
})

export default rootReducer