import { combineReducers } from 'redux'
import {
    AUTHORS_REQUEST_AUTHORS,
    AUTHORS_RECEIVE_AUTHORS,
    REQUEST_AUTHOR_DELETE,
    RECEIVE_AUTHOR_DELETE
} from '../actions/authorsActions'
import { ROOT_ERROR } from '../../Root/actions';

function authorList(
    state = {
        isFetching: false,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    },
    action
) {
    switch(action.type) {
        case AUTHORS_REQUEST_AUTHORS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case AUTHORS_RECEIVE_AUTHORS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.authors
            })
        case REQUEST_AUTHOR_DELETE:
            return Object.assign({}, state, {
                isBeingDeleted: action.authorId,
                isDeleted: -1
            })
        case RECEIVE_AUTHOR_DELETE:
            return Object.assign({}, state, {
                items: state.items.filter((author) => author.id !== action.authorId),
                isBeingDeleted: -1,
                isDeleted: action.authorId
            })
        case ROOT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                isBeingDeleted: -1,
                isDeleted: -1
            })
        default:
            return state
    }
}

const authorsReducer = combineReducers({
    authorList
})

export default authorsReducer