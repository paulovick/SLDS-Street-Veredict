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
import { editPostAction, fetchPost } from '../actions/editPostActions'
import PostContent from '../components/PostContent'

class EditPost extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        const postId = parseInt(this.props.match.params.postId, 10)
        dispatch(fetchPost(postId))
    }
    render() {
        const { dispatch, post, postJson, validation, isFetching, isEditing } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Edit Post</strong></i></h4>
                </div>
                <PostContent post={postJson} postReceived={post} validation={validation} disable={isEditing} isFetching={isFetching} isCreation={false} />
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(editPostAction(postJson))}
                >
                    <i className="material-icons">save</i>
                </button>
            </div>
        )
    }
}

EditPost.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapPost(post) {
    var result = {
        id: post.id,
        title: post.title,
        authorId: post.author.id,
        topicId: post.topic.id,
        type: post.type
    }
    if (post.type === 'full') {
        result.content = post.content
    } else if (post.type === 'link') {
        result.link = post.link
    }

    return result
}

function mapStateToProps(state) {
    const { postContentReducer, editPostReducer } = state
    const createOrEditPost = postContentReducer ? postContentReducer.createOrEditPost : null
    const editPost = editPostReducer ? editPostReducer.editPost : null
    let {
        postJson,
        validation
    } = createOrEditPost || {
        postJson: {},
        validation: {}
    }

    const {
        isEditing,
        jsonReceived,
        isFetching,
        post
    } = editPost || {
        isFetching: true,
        isEditing: false,
        jsonReceived: null,
        post: null
    }

    postJson = post ? mapPost(post) : postJson ? postJson : {}

    return {
        post,
        postJson,
        validation,
        isEditing,
        isFetching,
        jsonReceived
    }
}

export default connect(mapStateToProps)(EditPost)