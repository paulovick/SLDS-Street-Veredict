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