import { combineReducers } from 'redux'
import {
    TOPICS_REQUEST_TOPICS,
    TOPICS_RECEIVE_TOPICS,
    TOPICS_ERROR_TOPICS,
    REQUEST_TOPIC_DELETE,
    RECEIVE_TOPIC_DELETE,
    ERROR_TOPIC_DELETE
} from '../actions/topicsActions'

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
        case TOPICS_ERROR_TOPICS:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
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
        case ERROR_TOPIC_DELETE:
            return Object.assign({}, state, {
                error: action.error,
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