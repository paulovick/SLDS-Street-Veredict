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