import { combineReducers } from 'redux'
import {
    TOPICS_REQUEST_TOPICS,
    TOPICS_RECEIVE_TOPICS,
    TOPICS_ERROR_TOPICS
} from '../actions/topicsActions'

function topicList(
    state = {
        isFetching: false,
        items: [],
        error: false
    },
    action
) {
    switch(action.type) {
        case TOPICS_REQUEST_TOPICS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case TOPICS_RECEIVE_TOPICS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.topics
            })
        case TOPICS_ERROR_TOPICS:
            return Object.assign({}, state, {
                isFetching: false,
                error: true
            })
        default:
            return state
    }
}

const topicsReducer = combineReducers({
    topicList
})

export default topicsReducer