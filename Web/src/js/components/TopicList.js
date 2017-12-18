import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const TopicList = ({topics}) => (
    <div>
        <div className="collection">
            {topics.map((topic) => (
                <NavLink className="collection-item" to={`/topics/${topic.id}`}>{topic.name}</NavLink>
            ))}
        </div>
    </div>
)

TopicList.propTypes = {
    topics: PropTypes.array.isRequired
}

export default TopicList