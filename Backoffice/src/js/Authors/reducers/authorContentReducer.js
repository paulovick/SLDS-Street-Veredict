import { combineReducers } from 'redux'
import {
    AUTHOR_PROPERTY_MODIFIED,
    AUTHOR_JSON_VALIDATION_ERROR,
    AUTHOR_COMPONENT_RESET
} from '../actions/authorContentActions'

function createOrEditAuthor(
    state = {
        authorJson: null,
        validation: {},
    },
    action
) {
    switch(action.type) {
        case AUTHOR_COMPONENT_RESET:
            return Object.assign({}, state, {
                authorJson: null,
                validation: {}
            })
        case AUTHOR_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                authorJson: Object.assign({}, action.originalAuthor, {
                    [action.propertyName]: action.newValue
                })
            })
        case AUTHOR_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        default:
            return state
    }
}

const authorContentReducer = combineReducers({
    createOrEditAuthor
})

export default authorContentReducer