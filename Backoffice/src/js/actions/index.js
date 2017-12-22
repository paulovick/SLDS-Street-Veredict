import fetch from 'cross-fetch'

export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'

export const REQUEST_TOPIC = 'REQUEST_TOPIC'
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'

/* Topics */

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

function requestTopic(topicId) {
    return {
        type: REQUEST_TOPIC
    }
}

function receiveTopic(json) {
    return {
        type: RECEIVE_TOPIC,
        topic: json
    }
}

export function fetchTopic(topicId) {
    return function(dispatch) {
        dispatch(requestTopic(topicId))
        return fetch(`http://api.streetveredict.com/topics/${topicId}`)
            .then(
                response => response.json(),
                error => console.log(`Error receiving topic ${topicId}`, error)
            )
            .then(
                json => dispatch(receiveTopic(json))
            )
    }
}


/* Posts */

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

function requestPost(postId) {
    return {
        type: REQUEST_POST
    }
}

function receivePost(json) {
    return {
        type: RECEIVE_POST,
        post: json
    }
}

export function fetchPost(postId) {
    return function(dispatch) {
        dispatch(requestPost(postId))
        return fetch(`http://api.streetveredict.com/posts/${postId}`)
            .then(
                response => response.json(),
                error => console.log(`Error receiving topic ${postId}`, error)
            )
            .then(
                json => dispatch(receivePost(json))
            )
    }
}