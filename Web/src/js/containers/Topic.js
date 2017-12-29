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
import { fetchTopic } from '../actions'
import PostList from '../components/PostList'

class Topic extends React.Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { dispatch } = this.props
        dispatch(fetchTopic(topicId))
    }

    render() {
        const topicId = parseInt(this.props.match.params.topicId)
        const { isFetching, topic } = this.props
        return (
            <div className="sv-content-container">
                {isFetching &&
                    <p>Loading...</p>
                }
                {!isFetching && topic.posts.length === 0 &&
                    <div>
                        <div className="sv-title">
                            {topic.name}
                        </div>
                        <p>There are no posts to show.</p>
                    </div>
                }
                {!isFetching && topic.posts.length > 0 &&
                    <div>
                        <div className="sv-title">
                            Topic: {topic.name}
                        </div>
                        <PostList posts={topic.posts} />
                    </div>
                }
            </div>
        )
    }
}

Topic.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicSingle } = state
    const {
        topic,
        isFetching,
    } = topicSingle || {
        isFetching: true,
        topic: null
    }

    return {
        isFetching,
        topic
    }
}

export default connect(mapStateToProps)(Topic)