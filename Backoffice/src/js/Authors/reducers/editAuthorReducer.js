import { combineReducers } from 'redux'
import {
    EDIT_AUTHOR_FETCH_REQUEST,
    EDIT_AUTHOR_FETCH_RECEIVE,
    EDIT_AUTHOR_EDIT_REQUEST,
    EDIT_AUTHOR_EDIT_RECEIVE
} from '../actions/editAuthorActions'
import { AUTHOR_PROPERTY_MODIFIED } from '../actions/authorContentActions'
import { ROOT_ERROR } from '../../Root/actions'

function editAuthor(
    state = {
        isEditing: false,
        author: null
    },
    action
) {
    switch(action.type) {
        case EDIT_AUTHOR_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case EDIT_AUTHOR_FETCH_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                author: action.topic
            })
        case AUTHOR_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                author: null
            })
        case EDIT_AUTHOR_EDIT_REQUEST:
            return Object.assign({}, state, {
                isEditing: true,
                author: null,
            })
        case EDIT_AUTHOR_EDIT_RECEIVE:
            return Object.assign({}, state, {
                isEditing: false,
                author: action.json
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isEditing: false
            })
        default:
            return state
    }
}

const editAuthorReducer = combineReducers({
    editAuthor
})

export default editAuthorReducer