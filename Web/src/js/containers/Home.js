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
import { fetchTopics } from '../actions'
import TopicList from '../components/TopicList'

class Home extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTopics())
    }

    render() {
        const { isFetching, topics } = this.props
        return (
            <div>
                <div className="sv-title">Topics</div>
                <div className="sv-content-container">
                    {isFetching &&
                        <p>Loading...</p>
                    }
                    {!isFetching && topics.length === 0 &&
                        <p>There are no topics to show.</p>
                    }
                    {!isFetching && topics.length > 0 &&
                        <TopicList topics={topics} />
                    }
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicList } = state
    const {
        isFetching,
        items: topics
    } = topicList || {
        isFetching: true,
        items: []
    }

    return {
        isFetching,
        topics
    }
}

export default connect(mapStateToProps)(Home)