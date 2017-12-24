import $ from 'jquery'

export const TOPICS_REQUEST_TOPICS = 'TOPICS_REQUEST_TOPICS'
export const TOPICS_RECEIVE_TOPICS = 'TOPICS_RECEIVE_TOPICS'
export const TOPICS_ERROR_TOPICS = 'TOPICS_ERROR_TOPICS'

export const REQUEST_TOPIC_DELETE = 'REQUEST_TOPIC_DELETE'
export const RECEIVE_TOPIC_DELETE = 'RECEIVE_TOPIC_DELETE'
export const ERROR_TOPIC_DELETE = 'ERROR_TOPIC_DELETE'

function requestTopics() {
    return {
        type: TOPICS_REQUEST_TOPICS
    }
}

function receiveTopics(json) {
    return {
        type: TOPICS_RECEIVE_TOPICS,
        topics: json.values
    }
}

function errorTopics() {
    return {
        type: TOPICS_ERROR_TOPICS,
        error: "Error getting topics"
    }
}

export function getTopics() {
    return function(dispatch) {
        dispatch(requestTopics())
        return $.ajax({
            url: 'http://api.streetveredict.com/topics',
            method: 'GET'
        })
        .done((json) => dispatch(receiveTopics(json)))
        .fail((error) => {
            console.error('Error loading topics.', error)
            dispatch(errorTopics())
        })
    }
}

function requestTopicDelete(topicId) {
    return {
        type: REQUEST_TOPIC_DELETE,
        topicId: topicId
    }
}

function receiveTopicDelete(topicId) {
    return {
        type: RECEIVE_TOPIC_DELETE,
        topicId: topicId,
        success: "Topic deleted successful"
    }
}

function errorTopicDelete() {
    return {
        type: ERROR_TOPIC_DELETE,
        error: "Error deleting topic"
    }
}

export function deleteTopic(topicId) {
    return function(dispatch) {
        dispatch(requestTopicDelete(topicId))
        return $.ajax({
            url: `http://api.streetveredict.com/topics/${topicId}`,
            method: 'DELETE'
        })
        .done(() => dispatch(receiveTopicDelete(topicId)))
        .fail(() => dispatch(errorTopicDelete()))
    }
}