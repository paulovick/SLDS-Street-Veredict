import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTopics } from '../actions/topicsActions'
import TopicList from '../components/TopicList'
import { NavLink } from 'react-router-dom'

class Topics extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getTopics())
    }

    render() {
        let { isFetching, topics, error, isBeingDeleted, success } = this.props
        topics = topics.map((topic) => {
            if (isBeingDeleted > -1) {
                topic.isBeingDeleted = topic.id === isBeingDeleted
            }
            return topic
        })
        return (
            <div>
                <div className={ error ? 'sv-top-alert-error' : 'sv-hide-elements'}>
                    <span>{ error }</span>
                </div>
                <div className={ success ? 'sv-top-alert-success' : 'sv-hide-elements'}>
                    <span>{ success }</span>
                </div>
                <div>
                    <h4><i>Street Veredict <strong>Topics</strong></i></h4>
                </div>
                <TopicList isFetching={isFetching} topics={topics} />
                <NavLink to="/topics/create" className="btn-floating btn-large waves-effect waves-light orange">
                    <i class="material-icons">+</i>
                </NavLink>
            </div>
        )
    }
}

Topics.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isBeingDeleted: PropTypes.number.isRequired,
    isDeleted: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicsReducer } = state
    const topicList = topicsReducer ? topicsReducer.topicList : null
    const {
        isFetching,
        items: topics,
        error,
        isBeingDeleted,
        isDeleted,
        success
    } = topicList || {
        isFetching: true,
        items: [],
        error: null,
        isBeingDeleted: -1,
        isDeleted: -1,
        success: null
    }

    return {
        isFetching,
        topics,
        error,
        isBeingDeleted,
        isDeleted,
        success
    }
}

export default connect(mapStateToProps)(Topics)