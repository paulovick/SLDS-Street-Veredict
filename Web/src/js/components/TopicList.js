import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const TopicList = ({topics}) => (
    <div>
        <ul>
            {topics.map((topic) => (
                <li key={topic.id}><NavLink to={`/topics/${topic.id}`}>{topic.name}</NavLink></li>
            ))}
        </ul>
    </div>
)

TopicList.propTypes = {
    topics: PropTypes.array.isRequired
}

export default TopicList