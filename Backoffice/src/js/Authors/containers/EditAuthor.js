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
import { editAuthorAction, fetchAuthor } from '../actions/editAuthorActions'
import AuthorContent from '../components/AuthorContent'

class EditAuthor extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        const authorId = parseInt(this.props.match.params.authorId, 10)
        dispatch(fetchAuthor(authorId))
    }
    render() {
        const { dispatch, authorJson, validation, isFetching, isEditing } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Edit Author</strong></i></h4>
                </div>
                <AuthorContent author={authorJson} validation={validation} disable={isEditing} isFetching={isFetching} />
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(editAuthorAction(authorJson))}
                >
                    <i className="material-icons">save</i>
                </button>
            </div>
        )
    }
}

EditAuthor.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { authorContentReducer, editAuthorReducer } = state
    const createOrEditAuthor = authorContentReducer ? authorContentReducer.createOrEditAuthor : null
    const editAuthor = editAuthorReducer ? editAuthorReducer.editAuthor : null
    let {
        authorJson,
        validation
    } = createOrEditAuthor || {
        authorJson: {},
        validation: {}
    }

    const {
        isEditing,
        jsonReceived,
        isFetching,
        author
    } = editAuthor || {
        isFetching: true,
        isEditing: false,
        jsonReceived: null,
        author: null
    }

    authorJson = author ? author : authorJson ? authorJson : {}

    return {
        authorJson,
        validation,
        isEditing,
        isFetching,
        jsonReceived
    }
}

export default connect(mapStateToProps)(EditAuthor)