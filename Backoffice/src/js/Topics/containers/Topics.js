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
import { getTopics } from '../actions/topicsActions'
import TopicList from '../components/TopicList'
import { NavLink } from 'react-router-dom'
import { topicComponentReset } from '../actions/topicContentActions'

class Topics extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getTopics())
        dispatch(topicComponentReset())
    }
    render() {
        let { isFetching, topics, isBeingDeleted } = this.props
        topics = topics.map((topic) => {
            if (isBeingDeleted > -1) {
                topic.isBeingDeleted = topic.id === isBeingDeleted
            }
            return topic
        })
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Topics</strong></i></h4>
                </div>
                <TopicList isFetching={isFetching} topics={topics} />
                <NavLink to="/topics/create" className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange">
                    {/* <span className="sv-icon-plus">+</span> */}
                    <i className="material-icons">add</i>
                </NavLink>
            </div>
        )
    }
}

Topics.propTypes = {
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isBeingDeleted: PropTypes.number.isRequired,
    isDeleted: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicsReducer } = state
    const topicList = topicsReducer ? topicsReducer.topicList : null
    const {
        isFetching,
        items: topics,
        isBeingDeleted,
        isDeleted
    } = topicList || {
        isFetching: true,
        items: [],
        isBeingDeleted: -1,
        isDeleted: -1
    }

    return {
        isFetching,
        topics,
        isBeingDeleted,
        isDeleted
    }
}

export default connect(mapStateToProps)(Topics)