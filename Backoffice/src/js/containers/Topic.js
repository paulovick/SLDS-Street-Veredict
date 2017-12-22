import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTopic } from '../actions'
import PostList from '../components/PostList'

class Topic extends React.Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { dispatch } = this.props
        dispatch(fetchTopic(topicId))
    }

    render() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { isFetching, topic } = this.props
        return (
            <div className="sv-content-container">
                {isFetching &&
                    <p>Loading...</p>
                }
                {!isFetching && topic.posts.length === 0 &&
                    <div>
                        <div className="sv-title">
                            {topic.name}
                        </div>
                        <p>There are no posts to show.</p>
                    </div>
                }
                {!isFetching && topic.posts.length > 0 &&
                    <div>
                        <div className="sv-title">
                            Topic: {topic.name}
                        </div>
                        <PostList posts={topic.posts} />
                    </div>
                }
            </div>
        )
    }
}

Topic.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicSingle } = state
    const {
        topic,
        isFetching,
    } = topicSingle || {
        isFetching: true,
        topic: null
    }

    return {
        isFetching,
        topic
    }
}

export default connect(mapStateToProps)(Topic)