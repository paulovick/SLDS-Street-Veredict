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