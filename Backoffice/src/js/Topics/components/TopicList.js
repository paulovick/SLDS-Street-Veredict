
import React from 'react'
import PropTypes from 'prop-types'
import TopicRow from './TopicRow'

const TopicList = ({isFetching, topics}) => (
    <div className="card-panel sv-topic-list">
        <table>
            <thead>
                <tr>
                    <th className="sv-table-cell-id right-align">Id</th>
                    <th>Name</th>
                    <th className="sv-table-cell-posts"># posts</th>
                    <th className="sv-table-cell-created-at">Created At</th>
                    <th className="sv-table-cell-delete"></th>
                    <th className="sv-table-cell-delete"></th>
                </tr>
            </thead>

            <tbody>
                {!isFetching && topics.map((topic) => (
                        <TopicRow key={topic.id} topic={topic} />
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