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
import { editTopicAction, fetchTopic } from '../actions/editTopicActions'
import TopicContent from '../components/TopicContent'

class EditTopic extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        const topicId = parseInt(this.props.match.params.topicId, 10)
        dispatch(fetchTopic(topicId))
    }
    render() {
        const { dispatch, topicJson, validation, isFetching, isEditing } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Edit Topic</strong></i></h4>
                </div>
                <TopicContent topic={topicJson} validation={validation} disable={isEditing} isFetching={isFetching} />
                <button className="sv-fab-bottom-right btn-floating btn-large waves-effect waves-light orange"
                    onClick={() => dispatch(editTopicAction(topicJson))}
                >
                    <i className="material-icons">save</i>
                </button>
            </div>
        )
    }
}

EditTopic.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { topicContentReducer, editTopicReducer } = state
    const createOrEditTopic = topicContentReducer ? topicContentReducer.createOrEditTopic : null
    const editTopic = editTopicReducer ? editTopicReducer.editTopic : null
    let {
        topicJson,
        validation
    } = createOrEditTopic || {
        topicJson: {},
        validation: {}
    }

    const {
        isEditing,
        jsonReceived,
        isFetching,
        topic
    } = editTopic || {
        isFetching: true,
        isEditing: false,
        jsonReceived: null,
        topic: null
    }

    topicJson = topic ? topic : topicJson ? topicJson : {}

    return {
        topicJson,
        validation,
        isEditing,
        isFetching,
        jsonReceived
    }
}

export default connect(mapStateToProps)(EditTopic)