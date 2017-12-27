import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../actions/postsActions'
import PostList from '../components/PostList'
import { NavLink } from 'react-router-dom'
import { postComponentReset } from '../actions/postContentActions'

class Posts extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getPosts())
        dispatch(postComponentReset())
    }
    render() {
        let { isFetching, posts, isBeingDeleted } = this.props
        posts = posts.map((post) => {
            if (isBeingDeleted > -1) {
                post.isBeingDeleted = post.id === isBeingDeleted
            }
            return post
        })
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Posts</strong></i></h4>
                </div>
                <PostList isFetching={isFetching} posts={posts} />
                <NavLink to="/posts/create" className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange">
                    <i className="material-icons">add</i>
                </NavLink>
            </div>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isBeingDeleted: PropTypes.number.isRequired,
    isDeleted: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { postsReducer } = state
    const postList = postsReducer ? postsReducer.postList : null
    const {
        isFetching,
        items: posts,
        isBeingDeleted,
        isDeleted
    } = postList || {
        isFetching: true,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    }

    return {
        isFetching,
        posts,
        isBeingDeleted,
        isDeleted
    }
}

export default connect(mapStateToProps)(Posts)