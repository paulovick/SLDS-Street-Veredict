import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modifyAuthorProperty } from '../actions/authorContentActions'

class AuthorContent extends React.Component {
    render() {
        const {author, validation, isFetching, disable, dispatch} = this.props
        return (
            <div className="card-panel">
                {isFetching &&
                    <div>Loading...</div>
                }
                {!isFetching &&
                    <div className="row">
                        <div className={author.id !== null ? 'input-field col s12' : 'hide'}>
                            <input disabled="disabled"
                                defaultValue={author.id}
                                id="sv-create-author-id-id"
                            />
                            <label htmlFor="#sv-create-author-id-id" className="active">Id</label>
                        </div>
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