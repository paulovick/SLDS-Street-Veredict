import { combineReducers } from 'redux'
import {
    CREATE_POST_CREATE_REQUEST,
    CREATE_POST_CREATE_RECEIVE
} from '../actions/createPostActions'
import { ROOT_ERROR } from '../../Root/actions'

function createPost(
    state = {
        isCreating: false,
        jsonReceived: null
    },
    action
) {
    switch(action.type) {
        case CREATE_POST_CREATE_REQUEST:
            return Object.assign({}, state, {
                isCreating: true
            })
        case CREATE_POST_CREATE_RECEIVE:
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

const createPostReducer = combineReducers({
    createPost
})

export default createPostReducer