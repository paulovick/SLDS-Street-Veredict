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
import { createTopicAction } from '../actions/createTopicActions'
import TopicContent from '../components/TopicContent'

class CreateTopic extends React.Component {
    render() {
        const { dispatch, topicJson, validation, isCreating } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Create Topic</strong></i></h4>
                </div>
                <TopicContent topic={topicJson} validation={validation} disable={isCreating} />
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(createTopicAction(topicJson))}
                >
                    <i className="material-icons">check</i>
                </button>
            </div>
        )
    }
}

CreateTopic.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicContentReducer, createTopicReducer } = state
    const createOrEditTopic = topicContentReducer ? topicContentReducer.createOrEditTopic : null
    const createTopic = createTopicReducer ? createTopicReducer.createTopic : null
    let {
        topicJson,
        validation
    } = createOrEditTopic || {
        topicJson: {},
        validation: {}
    }

    const {
        isCreating,
        jsonReceived
    } = createTopic || {
        isCreating: false,
        jsonReceived: null
    }

    topicJson = topicJson ? topicJson : {}

    return {
        topicJson,
        validation,
        isCreating,
        jsonReceived
    }
}

export default connect(mapStateToProps)(CreateTopic)