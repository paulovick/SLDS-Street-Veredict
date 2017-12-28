import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modifyPostProperty } from '../actions/postContentActions'

class PostContent extends React.Component {
    componentDidMount() {
        const { post, dispatch } = this.props

        dispatch(modifyPostProperty(post, 'type', 'full'))
    }
    componentDidUpdate() {
        const { post, dispatch } = this.props

        const postTypeSelect = findDOMNode(this.refs.postTypeSelect)
        const jQuerySelect = window.jQuery(postTypeSelect)
        jQuerySelect.material_select()
        jQuerySelect.on('change', (e) => {
            var value = e.target.value ? e.target.value : 'full'
            dispatch(modifyPostProperty(post, 'type', value))
        })

        if (post.type && post.type === 'full') {
            if (!window.CKEDITOR.instances.postContentEditor) {
                window.CKEDITOR.replace('postContentEditor')
            }
        } else if (post.type && post.type === 'link') {
            if (window.CKEDITOR.instances.postContentEditor) {
                window.CKEDITOR.instances.postContentEditor.destroy();
            }
        }
    }
    componentWillUnmount() {
        if (window.CKEDITOR.instances.postContentEditor) {
            window.CKEDITOR.instances.postContentEditor.destroy();
        }
    }
    render() {
        const {post, validation, isFetching, disable, dispatch} = this.props
        return (
            <div className="card-panel">
                {isFetching &&
                    <div>Loading...</div>
                }
                {!isFetching &&
                    <div>
                        <div className="row">
                            <div className={post.id !== null ? 'input-field col s12' : 'hide'}>
                                <input disabled="disabled"
                                    defaultValue={post.id}
                                    id="sv-create-post-id-id"
                                />
                                <label htmlFor="#sv-create-post-id-id" className="active">Id</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="sv-create-post-title-id"
                                    defaultValue={post.title ? post.title : ''}
                                    type="text"
                                    className={validation.titleError && 'invalid'}
                                    onBlur={(e) => {
                                        var value = e.target.value ? e.target.value : null
                                        dispatch(modifyPostProperty(post, 'title', value))
                                    }}
                                    disabled={disable ? 'disabled' : ''}
                                />
                                <label htmlFor="#sv-create-post-title-id"
                                    data-error="Invalid title"
                                    className="active">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select ref="postTypeSelect"
                                    defaultValue={post.type ? post.type : 'full'}
                                >
                                    <option value="full">Full</option>
                                    <option value="link">Link</option>
                                </select>
                                <label>Post type</label>
                            </div>
                        </div>
                        {post.type && post.type === 'link' &&
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="sv-create-post-title-link"
                                        defaultValue={post.link ? post.link : ''}
                                        type="text"
                                        className={validation.titleError && 'invalid'}
                                        onBlur={(e) => {
                                            var value = e.target.value ? e.target.value : null
                                            dispatch(modifyPostProperty(post, 'link', value))
                                        }}
                                        disabled={disable ? 'disabled' : ''}
                                    />
                                    <label htmlFor="#sv-create-post-title-link"
                                        data-error="Invalid link"
                                        className="active">Link</label>
                                </div>
                            </div>
                        }
                        {post.type && post.type === 'full' &&
                            <div className="row">
                                <div className="col s12">
                                    <textarea name="postContentEditor"></textarea>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
} 

PostContent.propTypes = {
    post: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    disable: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(PostContent)