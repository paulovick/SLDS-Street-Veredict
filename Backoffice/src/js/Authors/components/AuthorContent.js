import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modifyAuthorProperty } from '../actions/authorContentActions'

class AuthorContent extends React.Component {
    componentDidMount() {
        const { author, dispatch } = this.props

        dispatch(modifyAuthorProperty(author, 'type', 'full'))

        const authorTypeSelect = findDOMNode(this.refs.authorTypeSelect)
        const jQuerySelect = window.jQuery(authorTypeSelect)
        jQuerySelect.material_select()
        jQuerySelect.on('change', (e) => {
            var value = e.target.value ? e.target.value : 'full'
            dispatch(modifyAuthorProperty(author, 'type', value))
        })
    }
    componentDidUpdate() {
        const { author, dispatch } = this.props

        const authorTypeSelect = findDOMNode(this.refs.authorTypeSelect)
        const jQuerySelect = window.jQuery(authorTypeSelect)
        jQuerySelect.material_select()
        jQuerySelect.on('change', (e) => {
            var value = e.target.value ? e.target.value : 'full'
            dispatch(modifyAuthorProperty(author, 'type', value))
        })
    }
    render() {
        const {author, validation, isFetching, disable, dispatch} = this.props
        return (
            <div className="card-panel">
                {isFetching &&
                    <div>Loading...</div>
                }
                {!isFetching &&
                    <div>
                        <div className="row">
                            <div className={author.id !== null ? 'input-field col s12' : 'hide'}>
                                <input disabled="disabled"
                                    defaultValue={author.id}
                                    id="sv-create-author-id-id"
                                />
                                <label htmlFor="#sv-create-author-id-id" className="active">Id</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="sv-create-author-title-id"
                                    defaultValue={author.name ? author.name : ''}
                                    type="text"
                                    className={validation.titleError && 'invalid'}
                                    onBlur={(e) => {
                                        var value = e.target.value ? e.target.value : null
                                        dispatch(modifyAuthorProperty(author, 'name', value))
                                    }}
                                    disabled={disable ? 'disabled' : ''}
                                />
                                <label htmlFor="#sv-create-author-title-id"
                                    data-error="Invalid name"
                                    className="active">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select ref="authorTypeSelect"
                                    defaultValue={author.type ? author.type : 'full'}
                                >
                                    <option value="full">Full</option>
                                    <option value="link">Link</option>
                                </select>
                                <label>Author type</label>
                            </div>
                        </div>
                        {author.type && author.type === 'link' &&
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="sv-create-author-title-link"
                                        defaultValue={author.link ? author.link : ''}
                                        type="text"
                                        className={validation.titleError && 'invalid'}
                                        onBlur={(e) => {
                                            var value = e.target.value ? e.target.value : null
                                            dispatch(modifyAuthorProperty(author, 'link', value))
                                        }}
                                        disabled={disable ? 'disabled' : ''}
                                    />
                                    <label htmlFor="#sv-create-author-title-link"
                                        data-error="Invalid link"
                                        className="active">Link</label>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
} 

AuthorContent.propTypes = {
    author: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    disable: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(AuthorContent)