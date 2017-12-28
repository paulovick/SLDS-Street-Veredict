import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTopic } from '../actions/topicsActions'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const TopicRow = ({topic, dispatch}) => (
    <tr className={topic.isDeleted && 'sv-topic-deleted'}>
        <td className="sv-table-cell-id right-align">{topic.id}</td>
        <td>{topic.name}</td>
        <td className="sv-table-cell-posts">{topic.posts.length}</td>
        <td className="sv-table-cell-created-at">{moment(topic.createdAt).format('D MMM YYYY, HH:mm')}</td>
        <td className="sv-table-cell-edit">
            <NavLink to={`/topics/edit/${topic.id}`} className="btn sv-table-action-btn">Edit</NavLink>
        </td>
        <td className="sv-table-cell-delete">
            <button onClick={() => dispatch(deleteTopic(topic.id))} className="btn sv-table-action-btn">Delete</button>
        </td>
    </tr>
)

TopicRow.propTypes = {
    topic: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(TopicRow)