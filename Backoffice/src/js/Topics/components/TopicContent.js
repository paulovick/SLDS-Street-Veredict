import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modifyTopicProperty } from '../actions/topicContentActions'

class TopicContent extends React.Component {
    render() {
        const {topic, validation, isFetching, disable, dispatch} = this.props
        return (
            <div className="card-panel">
                {isFetching &&
                    <div>Loading...</div>
                }
                {!isFetching &&
                    <div className="row">
                        <div className={topic.id !== null ? 'input-field col s12' : 'hide'}>
                            <input disabled="disabled"
                                defaultValue={topic.id}
                                id="sv-create-topic-id-id"
                            />
                            <label htmlFor="#sv-create-topic-id-id" className="active">Id</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="sv-create-topic-title-id"
                                defaultValue={topic.name ? topic.name : ''}
                                type="text"
                                className={validation.titleError && 'invalid'}
                                onBlur={(e) => {
                                    var value = e.target.value ? e.target.value : null
                                    dispatch(modifyTopicProperty(topic, 'name', value))
                                }}
                                disabled={disable ? 'disabled' : ''}
                            />
                            <label htmlFor="#sv-create-topic-title-id"
                                data-error="Invalid name"
                                className="active">Name</label>
                        </div>
                    </div>
                }
            </div>
        )
    }
} 

TopicContent.propTypes = {
    topic: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    disable: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(TopicContent)