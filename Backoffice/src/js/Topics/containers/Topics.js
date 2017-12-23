import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTopics } from '../actions/topicsActions'
import TopicList from '../components/TopicList'

class Topics extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getTopics())
    }

    render() {
        let { isFetching, topics, error, isBeingDeleted } = this.props
        topics = topics.map((topic) => {
            if (isBeingDeleted > -1) {
                topic.isBeingDeleted = topic.id === isBeingDeleted
            }
            return topic
        })
        return (
            <div>
                <div className={ error ? 'sv-top-alert' : 'sv-hide-elements'}>
                    <span>{ error !== null && error}</span>
                </div>
                <div>
                    <h4><i>Street Veredict <strong>Topics</strong></i></h4>
                </div>
                <TopicList isFetching={isFetching} topics={topics} />
            </div>
        )
    }
}

Topics.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isBeingDeleted: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicsReducer } = state
    const topicList = topicsReducer ? topicsReducer.topicList : null
    const {
        isFetching,
        items: topics,
        error,
        isBeingDeleted
    } = topicList || {
        isFetching: true,
        items: [],
        error: false,
        isBeingDeleted: -1
    }

    return {
        isFetching,
        topics,
        error,
        isBeingDeleted
    }
}

export default connect(mapStateToProps)(Topics)