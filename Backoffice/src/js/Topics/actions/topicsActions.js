import $ from 'jquery'

export const TOPICS_REQUEST_TOPICS = 'TOPICS_REQUEST_TOPICS'
export const TOPICS_RECEIVE_TOPICS = 'TOPICS_RECEIVE_TOPICS'
export const TOPICS_ERROR_TOPICS = 'TOPICS_ERROR_TOPICS'

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
        type: TOPICS_ERROR_TOPICS
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