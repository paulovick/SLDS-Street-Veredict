import { combineReducers } from 'redux'
import {
    POSTS_REQUEST_POSTS,
    POSTS_RECEIVE_POSTS,
    REQUEST_POST_DELETE,
    RECEIVE_POST_DELETE
} from '../actions/postsActions'
import { ROOT_ERROR } from '../../Root/actions';

function postList(
    state = {
        isFetching: false,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    },
    action
) {
    switch(action.type) {
        case POSTS_REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case POSTS_RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts
            })
        case REQUEST_POST_DELETE:
            return Object.assign({}, state, {
                isBeingDeleted: action.postId,
                isDeleted: -1
            })
        case RECEIVE_POST_DELETE:
            return Object.assign({}, state, {
                items: state.items.filter((post) => post.id !== action.postId),
                isBeingDeleted: -1,
                isDeleted: action.postId
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

const postsReducer = combineReducers({
    postList
})

export default postsReducer