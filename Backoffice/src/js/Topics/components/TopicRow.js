import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const TopicRow = ({topic}) => (
    <tr>
        <td><NavLink to={`/topics/${topic.id}`}>{topic.id}</NavLink></td>
        <td><NavLink to={`/topics/${topic.id}`}>{topic.name}</NavLink></td>
        <td>{topic.posts.length}</td>
        <td>{topic.createdAt}</td>
    </tr>
)

TopicRow.propTypes = {
    topic: PropTypes.object.isRequired
}

export default TopicRow