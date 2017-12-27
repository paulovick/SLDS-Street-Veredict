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