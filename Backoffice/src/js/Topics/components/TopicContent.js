import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const TopicContent = ({topic, validation, modifyPropertyAction, dispatch}) => (
    <div className="card-panel">
        <div className="row">
            <div className={topic.id !== null ? 'input-field col s12' : 'hide'}>
                <input disabled="disabled"
                    value={topic.id}
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
                        dispatch(modifyPropertyAction(topic, 'name', value))
                    }}
                />
                <label htmlFor="#sv-create-topic-title-id"
                    data-error="Invalid name"
                    className="active">Name</label>
            </div>
        </div>
    </div>
)

TopicContent.propTypes = {
    topic: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    modifyPropertyAction: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(TopicContent)