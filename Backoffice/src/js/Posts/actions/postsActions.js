/*
This file is part of Street Veredict.

Street Veredict - An API/Website/Backoffice to share opinions on a given topic.
Copyright (C) 2017  Pau Torrents I Gallego - Eduard Maestro Martinez

Street Veredict is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Street Veredict is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Street Veredict program.  If not, see <https://www.gnu.org/licenses/>.
*/


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

function receivePosts(json, filter) {
    return {
        type: POSTS_RECEIVE_POSTS,
        posts: json.values.filter((post) => {
            var result = true
            if (filter.authorName) {
                var authorRegex = new RegExp(filter.authorName, 'i')
                if (!authorRegex.test(post.author.name)) {
                    result = false
                }
            }
            if (filter.topicName) {
                var topicRegex = new RegExp(filter.topicName, 'i')
                if (!topicRegex.test(post.topic.name)) {
                    result = false
                }
            }
            return result
        })
    }
}

function createPostsQueryUrl(filter) {
    let result = 'http://api.streetveredict.com/posts'
    let anyFilter = false
    if (filter.title) {
        const titleQuery = filter.title.replace(' ', '+')
        if (!anyFilter) result += '?'
        else result += '&'
        result += 'title=' + titleQuery
        anyFilter = true
    }
    return result
}

export function getPosts(filter) {
    filter = filter || {}
    return function(dispatch) {
        dispatch(requestPosts())
        var url = createPostsQueryUrl(filter)
        return $.ajax({
            url: url,
            method: 'GET'
        })
        .done((json) => dispatch(receivePosts(json, filter)))
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