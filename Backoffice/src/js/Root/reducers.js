import { combineReducers } from 'redux'
import topicsReducer from '../Topics/reducers/topicsReducer'
import topicContentReducer from '../Topics/reducers/topicContentReducer'
import {
    ROOT_SUCCESS,
    ROOT_ERROR
} from './actions'

function rootReducer(
    state = {
        success: null,
        error: null
    },
    action
) {
    switch(action.type) {
        case ROOT_SUCCESS:
            return Object.assign({}, state, {
                success: action.success
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                error: action.error
            })
        default:
            return state
    }
}

const reducers = combineReducers({
    rootReducer,
    topicsReducer,
    topicContentReducer
})

export default reducers