import { combineReducers } from 'redux'
import {
    POST_PROPERTY_MODIFIED,
    POST_JSON_VALIDATION_ERROR,
    POST_COMPONENT_RESET
} from '../actions/postContentActions'

function createOrEditPost(
    state = {
        postJson: null,
        validation: {},
    },
    action
) {
    switch(action.type) {
        case POST_COMPONENT_RESET:
            return Object.assign({}, state, {
                postJson: null,
                validation: {}
            })
        case POST_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                postJson: Object.assign({}, action.originalPost, {
                    [action.propertyName]: action.newValue
                })
            })
        case POST_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        default:
            return state
    }
}

const postContentReducer = combineReducers({
    createOrEditPost
})

export default postContentReducer