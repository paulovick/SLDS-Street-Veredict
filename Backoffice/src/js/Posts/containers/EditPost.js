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
                <PostContent post={postJson} postReceived={post} validation={validation} disable={isEditing} isFetching={isFetching} />
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