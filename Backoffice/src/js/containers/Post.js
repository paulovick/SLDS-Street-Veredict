import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import PostSingle from '../components/PostSingle'

class Post extends React.Component {
    componentDidMount() {
        const postId = parseInt(this.props.match.params.postId)
        const { dispatch } = this.props
        dispatch(fetchPost(postId))
    }

    render() {
        const postId = parseInt(this.props.match.params.postId)
        const { isFetching, post } = this.props
        return (
            <div className="sv-content-container">
                {isFetching &&
                    <p>Loading...</p>
                }
                {!isFetching &&
                    <PostSingle post={post} />
                }
            </div>
        )
    }
}

Post.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { postSingle } = state
    const {
        post,
        isFetching,
    } = postSingle || {
        isFetching: true,
        post: null
    }

    return {
        isFetching,
        post
    }
}

export default connect(mapStateToProps)(Post)