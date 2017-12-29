import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPostAction } from '../actions/createPostActions'
import PostContent from '../components/PostContent'

class CreatePost extends React.Component {
    render() {
        const { dispatch, postJson, validation, isCreating } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Create Post</strong></i></h4>
                </div>
                <PostContent post={postJson} validation={validation} disable={isCreating} isCreation={true}/>
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(createPostAction(postJson))}
                >
                    <i className="material-icons">check</i>
                </button>
            </div>
        )
    }
}

CreatePost.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { postContentReducer, postAuthorReducer } = state
    const createOrEditPost = postContentReducer ? postContentReducer.createOrEditPost : null
    const createPost = postAuthorReducer ? postAuthorReducer.createPost : null
    let {
        postJson,
        validation
    } = createOrEditPost || {
        postJson: {},
        validation: {}
    }

    const {
        isCreating,
        jsonReceived
    } = createPost || {
        isCreating: false,
        jsonReceived: null
    }

    postJson = postJson ? postJson : {}

    return {
        postJson,
        validation,
        isCreating,
        jsonReceived
    }
}

export default connect(mapStateToProps)(CreatePost)