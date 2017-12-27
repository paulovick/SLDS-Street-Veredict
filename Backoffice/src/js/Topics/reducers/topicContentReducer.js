import { combineReducers } from 'redux'
import {
    TOPIC_PROPERTY_MODIFIED,
    TOPIC_JSON_VALIDATION_ERROR
} from '../actions/topicContentActions'

function createOrEditTopic(
    state = {
        topicJson: null,
        validation: {},
    },
    action
) {
    switch(action.type) {
        case TOPIC_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                topicJson: Object.assign({}, action.originalTopic, {
                    [action.propertyName]: action.newValue
                })
            })
        case TOPIC_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation,
                topicJson: null
            })
        default:
            return state
    }
}

const topicContentReducer = combineReducers({
    createOrEditTopic
})

export default topicContentReducer