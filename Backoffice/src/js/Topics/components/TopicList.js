
import React from 'react'
import PropTypes from 'prop-types'
import TopicRow from './TopicRow'

const TopicList = ({isFetching, topics}) => (
    <div className="card-panel sv-topic-list">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th># posts</th>
                    <th>Created At</th>
                </tr>
            </thead>

            <tbody>
                {!isFetching && topics.map((topic) => (
                        <TopicRow key={topic.id} topic={topic}/>
                    ))
                }
            </tbody>
        </table>
        {isFetching &&
            <div>Loading...</div>
        }
    </div>
)

TopicList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    topics: PropTypes.array.isRequired
}

export default TopicList