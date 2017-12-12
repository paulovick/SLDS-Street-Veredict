import fetch from 'cross-fetch'

export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestTopics() {
    return {
        type: REQUEST_TOPICS
    }
}

function receiveTopics(json) {
    return {
        type: RECEIVE_TOPICS,
        topics: json.values
    }
}

export function fetchTopics() {
    return function(dispatch) {
        dispatch(requestTopics())
        return fetch('http://api.streetveredict.com/topics')
            .then(
                response => response.json(),
                error => console.log('Error receiving topics.', error)
            )
            .then(json => dispatch(receiveTopics(json)))
    }
}

function requestPosts(topicId) {
    return {
        type: REQUEST_POSTS,
        topicId
    }
}

function receivePosts(topicId, json) {
    return {
        type: RECEIVE_POSTS,
        topicId,
        posts: json.posts
    }
}

export function fetchPosts(topicId) {
    return function(dispatch) {
        dispatch(requestPosts(topicId))
        return fetch(`http://api.streetveredict.com/topics/${topicId}`)
            .then(
                response => response.json(),
                error => console.error('Error receiving posts.', error)
            )
            .then(json => dispatch(receivePosts(topicId, json)))
    }
}