import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAuthorAction } from '../actions/createAuthorActions'
import AuthorContent from '../components/AuthorContent'

class CreateAuthor extends React.Component {
    render() {
        const { dispatch, authorJson, validation, isCreating } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Create Author</strong></i></h4>
                </div>
                <AuthorContent author={authorJson} validation={validation} disable={isCreating} />
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(createAuthorAction(authorJson))}
                >
                    <i className="material-icons">check</i>
                </button>
            </div>
        )
    }
}

CreateAuthor.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { authorContentReducer, createAuthorReducer } = state
    const createOrEditAuthor = authorContentReducer ? authorContentReducer.createOrEditAuthor : null
    const createAuthor = createAuthorReducer ? createAuthorReducer.createAuthor : null
    let {
        authorJson,
        validation
    } = createOrEditAuthor || {
        authorJson: {},
        validation: {}
    }

    const {
        isCreating,
        jsonReceived
    } = createAuthor || {
        isCreating: false,
        jsonReceived: null
    }

    authorJson = authorJson ? authorJson : {}

    return {
        authorJson,
        validation,
        isCreating,
        jsonReceived
    }
}

export default connect(mapStateToProps)(CreateAuthor)