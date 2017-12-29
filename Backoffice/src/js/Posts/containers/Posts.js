/*
This file is part of Street Veredict.

Street Veredict - An API/Website/Backoffice to share opinions on a given topic.
Copyright (C) 2017  Pau Torrents I Gallego - Eduard Maestro Martinez

Street Veredict is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Street Veredict is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Street Veredict program.  If not, see <https://www.gnu.org/licenses/>.
*/


import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../actions/postsActions'
import PostList from '../components/PostList'
import { NavLink } from 'react-router-dom'
import { postComponentReset } from '../actions/postContentActions'
import moment from 'moment'

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
        isDeleted,
        filter
    } = postList || {
        isFetching: true,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1,
        filter: {}
    }

    return {
        isFetching,
        posts: posts.sort((p1, p2) => moment(p2.createdAt).isAfter(p1.createdAt)),
        isBeingDeleted,
        isDeleted,
        filter
    }
}

export default connect(mapStateToProps)(Posts)