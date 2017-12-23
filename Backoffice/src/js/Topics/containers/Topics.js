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
        const { isFetching, topics, error } = this.props
        return (
            <div>
                <div className={ error ? 'sv-top-alert' : 'sv-hide-elements'}>
                    <span>There was an error loading topics. Please try again.</span>
                </div>
                <div>
                    <h4><i>Street Veredict <strong>Topics</strong></i></h4>
                </div>
                <TopicList isFetching={isFetching} topics={topics}/>
            </div>
        )
    }
}

Topics.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicsReducer } = state
    const topicList = topicsReducer ? topicsReducer.topicList : null
    const {
        isFetching,
        items: topics,
        error
    } = topicList || {
        isFetching: true,
        items: [],
        error: false
    }

    return {
        isFetching,
        topics,
        error
    }
}

export default connect(mapStateToProps)(Topics)