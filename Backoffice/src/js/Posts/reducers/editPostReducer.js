import { combineReducers } from 'redux'
import {
    EDIT_POST_FETCH_REQUEST,
    EDIT_POST_FETCH_RECEIVE,
    EDIT_POST_EDIT_REQUEST,
    EDIT_POST_EDIT_RECEIVE
} from '../actions/editPostActions'
import { POST_PROPERTY_MODIFIED } from '../actions/postContentActions'
import { ROOT_ERROR } from '../../Root/actions'

function editPost(
    state = {
        isFetching: false,
        isEditing: false,
        post: null
    },
    action
) {
    switch(action.type) {
        case EDIT_POST_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case EDIT_POST_FETCH_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                post: action.post
            })
        case POST_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                post: null
            })
        case EDIT_POST_EDIT_REQUEST:
            return Object.assign({}, state, {
                isEditing: true,
                post: null,
            })
        case EDIT_POST_EDIT_RECEIVE:
            return Object.assign({}, state, {
                isEditing: false,
                post: action.json
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isEditing: false
            })
        default:
            return state
    }
}

const editPostReducer = combineReducers({
    editPost
})

export default editPostReducer