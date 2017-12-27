import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthors } from '../actions/authorsActions'
import AuthorList from '../components/AuthorList'
import { NavLink } from 'react-router-dom'
import { authorComponentReset } from '../actions/authorContentActions'

class Authors extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getAuthors())
        dispatch(authorComponentReset())
    }
    render() {
        let { isFetching, authors, isBeingDeleted } = this.props
        authors = authors.map((author) => {
            if (isBeingDeleted > -1) {
                author.isBeingDeleted = author.id === isBeingDeleted
            }
            return author
        })
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Authors</strong></i></h4>
                </div>
                <AuthorList isFetching={isFetching} authors={authors} />
                <NavLink to="/authors/create" className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange">
                    <i className="material-icons">add</i>
                </NavLink>
            </div>
        )
    }
}

Authors.propTypes = {
    authors: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isBeingDeleted: PropTypes.number.isRequired,
    isDeleted: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { authorsReducer } = state
    const authorList = authorsReducer ? authorsReducer.authorList : null
    const {
        isFetching,
        items: authors,
        isBeingDeleted,
        isDeleted
    } = authorList || {
        isFetching: true,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    }

    return {
        isFetching,
        authors,
        isBeingDeleted,
        isDeleted
    }
}

export default connect(mapStateToProps)(Authors)