import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTopics } from '../actions/topicsActions'
import TopicList from '../components/TopicList'
import { NavLink } from 'react-router-dom'
import { topicComponentReset } from '../actions/topicContentActions'

class Topics extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getTopics())
        dispatch(topicComponentReset())
    }
    render() {
        let { isFetching, topics, isBeingDeleted } = this.props
        topics = topics.map((topic) => {
            if (isBeingDeleted > -1) {
                topic.isBeingDeleted = topic.id === isBeingDeleted
            }
            return topic
        })
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Topics</strong></i></h4>
                </div>
                <TopicList isFetching={isFetching} topics={topics} />
                <NavLink to="/topics/create" className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange">
                    {/* <span className="sv-icon-plus">+</span> */}
                    <i className="material-icons">add</i>
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
        isBeingDeleted,
        isDeleted
    } = topicList || {
        isFetching: true,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    }

    return {
        isFetching,
        topics,
        isBeingDeleted,
        isDeleted
    }
}

export default connect(mapStateToProps)(Topics)