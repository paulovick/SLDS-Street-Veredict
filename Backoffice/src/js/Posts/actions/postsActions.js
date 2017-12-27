import $ from 'jquery'
import {
    rootSuccess,
    rootError
} from '../../Root/actions'

export const POSTS_REQUEST_POSTS = 'POSTS_REQUEST_POSTS'
export const POSTS_RECEIVE_POSTS = 'POSTS_RECEIVE_POSTS'

export const REQUEST_POST_DELETE = 'REQUEST_POST_DELETE'
export const RECEIVE_POST_DELETE = 'RECEIVE_AUTHOR_DELETE'

function requestPosts() {
    return {
        type: POSTS_REQUEST_POSTS
    }
}

function receivePosts(json) {
    return {
        type: POSTS_RECEIVE_POSTS,
        posts: json.values
    }
}

export function getPosts() {
    return function(dispatch) {
        dispatch(requestPosts())
        return $.ajax({
            url: 'http://api.streetveredict.com/posts',
            method: 'GET'
        })
        .done((json) => dispatch(receivePosts(json)))
        .fail((error) => {
            dispatch(rootError('Error loading posts'))
        })
    }
}

function requestPostDelete(postId) {
    return {
        type: REQUEST_POST_DELETE,
        postId: postId
    }
}

function receivePostDelete(postId) {
    return {
        type: RECEIVE_POST_DELETE,
        postId: postId
    }
}

export function deletePost(postId) {
    return function(dispatch) {
        dispatch(requestPostDelete(postId))
        return $.ajax({
            url: `http://api.streetveredict.com/posts/${postId}`,
            method: 'DELETE'
        })
        .done(() => {
            dispatch(receivePostDelete(postId))
            dispatch(rootSuccess('Post deleted successfully'))
        })
        .fail(() => dispatch(rootError('Error deleting post')))
    }
}