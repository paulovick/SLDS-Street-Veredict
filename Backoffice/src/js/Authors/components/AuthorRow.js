import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAuthor } from '../actions/authorsActions'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const AuthorRow = ({author, dispatch}) => (
    <tr className={author.isDeleted && 'sv-author-deleted'}>
        <td className="sv-table-cell-id right-align">{author.id}</td>
        <td>{author.name}</td>
        <td className="sv-table-cell-posts">{author.posts.length}</td>
        <td className="sv-table-cell-created-at">{moment(author.createdAt).format('D MMM YYYY, HH:mm')}</td>
        <td className="sv-table-cell-edit">
            <NavLink to={`/authors/edit/${author.id}`} className="btn sv-table-action-btn">Edit</NavLink>
        </td>
        <td className="sv-table-cell-delete">
            <button onClick={() => dispatch(deleteAuthor(author.id))} className="btn sv-table-action-btn">Delete</button>
        </td>
    </tr>
)

AuthorRow.propTypes = {
    author: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(AuthorRow)