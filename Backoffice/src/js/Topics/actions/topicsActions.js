import $ from 'jquery'
import {
    rootSuccess,
    rootError
} from '../../Root/actions'

export const TOPICS_REQUEST_TOPICS = 'TOPICS_REQUEST_TOPICS'
export const TOPICS_RECEIVE_TOPICS = 'TOPICS_RECEIVE_TOPICS'

export const REQUEST_TOPIC_DELETE = 'REQUEST_TOPIC_DELETE'
export const RECEIVE_TOPIC_DELETE = 'RECEIVE_TOPIC_DELETE'

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

export function getTopics() {
    return function(dispatch) {
        dispatch(requestTopics())
        return $.ajax({
            url: 'http://api.streetveredict.com/topics',
            method: 'GET'
        })
        .done((json) => dispatch(receiveTopics(json)))
        .fail((error) => {
            dispatch(rootError('Error loading topics'))
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

export function deleteTopic(topicId) {
    return function(dispatch) {
        dispatch(requestTopicDelete(topicId))
        return $.ajax({
            url: `http://api.streetveredict.com/topics/${topicId}`,
            method: 'DELETE'
        })
        .done(() => {
            dispatch(receiveTopicDelete(topicId))
            dispatch(rootSuccess('Topic deleted successfully'))
        })
        .fail(() => dispatch(rootError('Error deleting topic')))
    }
}