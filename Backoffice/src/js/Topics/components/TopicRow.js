import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTopic } from '../actions/topicsActions'
import { dispatch } from 'react-redux'

const TopicRow = ({topic, dispatch}) => (
    <tr>
        <td>{topic.id}</td>
        <td>{topic.name}</td>
        <td>{topic.posts.length}</td>
        <td>{topic.createdAt}</td>
        <td>
            <button onClick={() => dispatch(deleteTopic(topic.id))} className="btn">Delete</button>
        </td>
    </tr>
)

TopicRow.propTypes = {
    topic: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(TopicRow)