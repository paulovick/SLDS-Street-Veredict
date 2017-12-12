import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import PostList from '../components/PostList'

class Posts extends React.Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { dispatch } = this.props
        dispatch(fetchPosts(topicId))
    }

    render() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { isFetching, posts } = this.props
        return (
            <div>
                <div>
                    TopicId: {topicId}
                </div>
                <div>
                    {isFetching &&
                        <p>Loading...</p>
                    }
                    {!isFetching && posts.length === 0 &&
                        <p>There are no posts to show.</p>
                    }
                    {!isFetching && posts.length > 0 &&
                        <PostList posts={posts} />
                    }
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    topicId: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { postList } = state
    const {
        topicId,
        isFetching,
        items: posts
    } = postList || {
        isFetching: true,
        topicId: 0,
        items: []
    }

    return {
        isFetching,
        topicId,
        posts
    }
}

export default connect(mapStateToProps)(Posts)