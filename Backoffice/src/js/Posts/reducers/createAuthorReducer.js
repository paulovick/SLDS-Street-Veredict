import { combineReducers } from 'redux'
import {
    CREATE_AUTHOR_CREATE_REQUEST,
    CREATE_AUTHOR_CREATE_RECEIVE
} from '../actions/createAuthorActions'
import { ROOT_ERROR } from '../../Root/actions'

function createAuthor(
    state = {
        isCreating: false,
        jsonReceived: null
    },
    action
) {
    switch(action.type) {
        case CREATE_AUTHOR_CREATE_REQUEST:
            return Object.assign({}, state, {
                isCreating: true
            })
        case CREATE_AUTHOR_CREATE_RECEIVE:
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

const createAuthorReducer = combineReducers({
    createAuthor
})

export default createAuthorReducer