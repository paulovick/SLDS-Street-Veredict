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