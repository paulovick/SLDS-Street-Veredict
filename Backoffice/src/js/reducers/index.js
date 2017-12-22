import { combineReducers } from 'redux'
import {
    REQUEST_TOPICS,
    RECEIVE_TOPICS,
    REQUEST_TOPIC,
    RECEIVE_TOPIC,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    REQUEST_POST,
    RECEIVE_POST
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

function topicSingle(
    state = {
        isFetching: true,
        topic: null
    },
    action
) {
    switch(action.type) {
        case REQUEST_TOPIC:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_TOPIC:
            return Object.assign({}, state, {
                isFetching: false,
                topic: action.topic
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

function postSingle(
    state = {
        isFetching: true,
        post: null
    },
    action
) {
    switch(action.type) {
        case REQUEST_POST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_POST:
            return Object.assign({}, state, {
                isFetching: false,
                post: action.post
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    topicList,
    topicSingle,
    postList,
    postSingle
})

export default rootReducer