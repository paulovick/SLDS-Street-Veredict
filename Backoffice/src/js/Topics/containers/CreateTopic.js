import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTopicAction } from '../actions/createTopicActions'
import TopicContent from '../components/TopicContent'
import { modifyTopicProperty } from '../actions/createTopicActions'

class CreateTopic extends React.Component {
    render() {
        const { dispatch, topicJson, validation } = this.props
        return (
            <div>
                <div>
                    <h4><i>Street Veredict <strong>Create Topic</strong></i></h4>
                </div>
                <TopicContent topic={topicJson} validation={validation} modifyPropertyAction={modifyTopicProperty}/>
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
    const { createTopicReducer } = state
    const createTopic = createTopicReducer ? createTopicReducer.createTopic : null
    const {
        topicJson,
        validation,
        isCreating,
        jsonReceived
    } = createTopic || {
        topicJson: {},
        validation: {},
        isCreating: false,
        jsonReceived: null
    }

    return {
        topicJson,
        validation,
        isCreating,
        jsonReceived
    }
}

export default connect(mapStateToProps)(CreateTopic)