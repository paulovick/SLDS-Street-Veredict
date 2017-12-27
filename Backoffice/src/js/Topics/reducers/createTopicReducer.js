import { combineReducers } from 'redux'
import {
    CREATE_TOPIC_CREATE_REQUEST,
    CREATE_TOPIC_CREATE_RECEIVE
} from '../actions/createTopicActions'
import { ROOT_ERROR } from '../../Root/actions'

function createTopic(
    state = {
        isCreating: false,
        jsonReceived: null
    },
    action
) {
    switch(action.type) {
        case CREATE_TOPIC_CREATE_REQUEST:
            return Object.assign({}, state, {
                isCreating: true
            })
        case CREATE_TOPIC_CREATE_RECEIVE:
            return Object.assign({}, state, {
                isCreating: false,
                jsonReceived: action.json
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isCreating: false,
                jsonReceived: null
            })
        default:
            return state
    }
}

const createTopicReducer = combineReducers({
    createTopic
})

export default createTopicReducer