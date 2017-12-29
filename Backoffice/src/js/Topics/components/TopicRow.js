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