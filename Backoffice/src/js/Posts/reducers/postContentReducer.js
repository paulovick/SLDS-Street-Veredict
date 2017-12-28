import { combineReducers } from 'redux'
import {
    POST_PROPERTY_MODIFIED,
    POST_JSON_VALIDATION_ERROR,
    POST_COMPONENT_RESET,
    POST_AUTHORS_RECEIVE,
    POST_AUTHORS_REQUEST
} from '../actions/postContentActions'

function createOrEditPost(
    state = {
        postJson: null,
        validation: {},
        authors: null,
        topics: null
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
        case POST_AUTHORS_REQUEST:
            return Object.assign({}, state, {
                authors: null
            })
        case POST_AUTHORS_RECEIVE:
            return Object.assign({}, state, {
                authors: action.authors
            })
        default:
            return state
    }
}

const postContentReducer = combineReducers({
    createOrEditPost
})

export default postContentReducer