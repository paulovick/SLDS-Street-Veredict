import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost } from '../actions/postsActions'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const PostRow = ({post, dispatch}) => (
    <tr className={post.isDeleted && 'sv-author-deleted'}>
        <td className="sv-table-cell-id right-align">{post.id}</td>
        <td>{post.title}</td>
        <td className="sv-table-cell-author truncate">{post.author.name}</td>
        <td className="sv-table-cell-created-at">{moment(post.createdAt).format('D MMM YYYY, HH:mm')}</td>
        <td className="sv-table-cell-edit">
            <NavLink to={`/posts/edit/${post.id}`} className="btn sv-table-action-btn">Edit</NavLink>
        </td>
        <td className="sv-table-cell-delete">
            <button onClick={() => dispatch(deletePost(post.id))} className="btn sv-table-action-btn">Delete</button>
        </td>
    </tr>
)

PostRow.propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(PostRow)