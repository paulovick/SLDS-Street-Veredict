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
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    modifyPostProperty,
    fetchAuthors,
    fetchTopics,
    authorsInitializedAction,
    topicsInitializedAction
} from '../actions/postContentActions'
import $ from 'jquery'

function createCKEditor(callbackOnBlur) {
    if (!window.CKEDITOR.instances.postContentEditor) {
        try {
            window.CKEDITOR.replace('postContentEditor')
            window.CKEDITOR.instances.postContentEditor.on('blur', callbackOnBlur);
        } catch(ex) {
            console.log("Couldn't load CKEditor")
        }
    }
}

function destroyCKEditor() {
    if (window.CKEDITOR.instances.postContentEditor) {
        window.CKEDITOR.instances.postContentEditor.destroy();
    }
}

function initializePostTypeSelect(ref, callbackOnBlur) {
    const postTypeSelect = findDOMNode(ref)
    const jQuerySelect = window.jQuery(postTypeSelect)
    jQuerySelect.material_select()
    jQuerySelect.on('change', callbackOnBlur)
}

function entityMatcher(entities) {
    return function findMatches(query, callback) {
        var matches = []
        var nameRegex = new RegExp(query, 'i')
        $.each(entities, function(i, entity) {
            if (entity && nameRegex.test(entity.name)) {
                matches.push(entity)
            }
        })
        callback(matches)
    }
}

function initializeAuthorInput(ref, authors, defaultAuthor, selectedCallback) {
    const authorInput = findDOMNode(ref)
    const jQueryInput = window.jQuery(authorInput)

    var authorTypeahead = jQueryInput.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'authors',
        display: 'name',
        valueKey: 'id',
        source: entityMatcher(authors ? authors : [])
    })
    authorTypeahead.bind('typeahead:selected', selectedCallback)
    if (defaultAuthor) {
        authorTypeahead.typeahead('val', defaultAuthor.name)
    }
}

function initializeTopicInput(ref, topics, defaultTopic, selectedCallback) {
    const topicInput = findDOMNode(ref)
    const jQueryInput = window.jQuery(topicInput)

    var topicTypeahead = jQueryInput.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'topics',
        display: 'name',
        valueKey: 'id',
        source: entityMatcher(topics ? topics : [])
    })
    topicTypeahead.bind('typeahead:selected', selectedCallback)
    if (defaultTopic) {
        topicTypeahead.typeahead('val', defaultTopic.name)
    }
}

class PostContent extends React.Component {
    constructor(props) {
        super(props)
        this.handleAuthorOnChange = this.handleAuthorOnChange.bind(this)
        this.handleTopicOnChange = this.handleTopicOnChange.bind(this)
        this.handleCKEditorOnBlur = this.handleCKEditorOnBlur.bind(this)
        this.handlePostTypeOnBlur = this.handlePostTypeOnBlur.bind(this)
    }
    componentDidMount() {
        const { post, dispatch } = this.props

        dispatch(modifyPostProperty(post, 'type', 'full'))
        dispatch(fetchAuthors())
        dispatch(fetchTopics())
    }
    componentDidUpdate() {
        const { post, postReceived, authors, topics, authorsInitialized, topicsInitialized, dispatch, isCreation } = this.props

        if (!authorsInitialized && authors && (postReceived || isCreation)) {
            initializeAuthorInput(this.refs.postAuthorInput, authors, postReceived ? postReceived.author : null, this.handleAuthorOnChange)
            if (authors && (postReceived || isCreation)) {
                dispatch(authorsInitializedAction())
            }
        }
        if (!topicsInitialized && topics && (postReceived || isCreation)) {
            initializeTopicInput(this.refs.postTopicInput, topics, postReceived ? postReceived.topic : null, this.handleTopicOnChange)
            if (topics && (postReceived || isCreation)) {
                dispatch(topicsInitializedAction())
            }
        }
        initializePostTypeSelect(this.refs.postTypeSelect, this.handlePostTypeOnBlur)

        if (post.type && post.type === 'full') {
            createCKEditor(this.handleCKEditorOnBlur)
        } else if (post.type && post.type === 'link') {
            destroyCKEditor()
        }
    }
    componentWillUnmount() {
        destroyCKEditor()
    }
    handleAuthorOnChange(obj, datum, name) {
        const { post, dispatch } = this.props
        const value = datum ? datum.id : null
        dispatch(modifyPostProperty(post, 'authorId', value))
    }
    handleTopicOnChange(obj, datum, name) {
        const { post, dispatch } = this.props
        const value = datum ? datum.id : null
        dispatch(modifyPostProperty(post, 'topicId', value))
    }
    handlePostTypeOnBlur(e) {
        const { post, dispatch } = this.props
        var value = e.target.value ? e.target.value : 'full'
        dispatch(modifyPostProperty(post, 'type', value))
    }
    handleCKEditorOnBlur(e) {
        const { post, dispatch } = this.props
        const content = e.editor.getData()
        dispatch(modifyPostProperty(post, 'content', content))
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
                            <div className="input-field col s6">
                                <input id="sv-create-post-author-id"
                                    type="text"
                                    ref="postAuthorInput"
                                    placeholder="Search for an author"
                                />
                                <label htmlFor="#sv-create-post-author-id"
                                    data-error="Invalid author"
                                    className="active">Author</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="sv-create-post-topic-id"
                                    type="text"
                                    ref="postTopicInput"
                                    placeholder="Search for an topic"
                                />
                                <label htmlFor="#sv-create-post-topic-id"
                                    data-error="Invalid topic"
                                    className="active">Topic</label>
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
                                    <textarea name="postContentEditor" defaultValue={post.content ? post.content : ''}></textarea>
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

function mapStateToProps(state, ownProps) {
    const { postContentReducer } = state
    const { post, validation, isFetching, disable, isCreation } = ownProps
    const createOrEditPost = postContentReducer ? postContentReducer.createOrEditPost : null

    const {
        authors,
        topics,
        authorsInitialized,
        topicsInitialized
    } = createOrEditPost || {
        authors: [],
        topics: [],
        authorsInitialized: false,
        topicsInitialized: false
    }

    return {
        post,
        validation,
        isFetching,
        disable,
        authors,
        topics,
        authorsInitialized,
        topicsInitialized,
        isCreation
    }
} 

export default connect(mapStateToProps)(PostContent)