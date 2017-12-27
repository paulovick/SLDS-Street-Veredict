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