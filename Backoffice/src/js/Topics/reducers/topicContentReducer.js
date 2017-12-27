import { combineReducers } from 'redux'
import {
    CREATE_TOPIC_CREATE_REQUEST,
    CREATE_TOPIC_CREATE_RECEIVE
} from '../actions/createTopicActions'
import {
    TOPIC_PROPERTY_MODIFIED,
    TOPIC_JSON_VALIDATION_ERROR
} from '../actions/topicContentActions'
import { ROOT_ERROR } from '../../Root/actions';

function createOrEditTopic(
    state = {
        topicJson: {},
        validation: {},
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
                jsonReceived: action.json,
                success: action.success
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isCreating: false,
                jsonReceived: null
            })
        case TOPIC_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                topicJson: Object.assign({}, action.originalTopic, {
                    [action.propertyName]: action.newValue
                })
            })
        case TOPIC_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        default:
            return state
    }
}

const topicContentReducer = combineReducers({
    createOrEditTopic
})

export default topicContentReducer