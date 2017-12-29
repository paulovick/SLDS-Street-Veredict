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


import { combineReducers } from 'redux'
import {
    TOPIC_PROPERTY_MODIFIED,
    TOPIC_JSON_VALIDATION_ERROR,
    TOPIC_COMPONENT_RESET
} from '../actions/topicContentActions'

function createOrEditTopic(
    state = {
        topicJson: null,
        validation: {},
    },
    action
) {
    switch(action.type) {
        case TOPIC_COMPONENT_RESET:
            return Object.assign({}, state, {
                topicJson: null,
                validation: {}
            })
        case TOPIC_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                topicJson: Object.assign({}, action.originalTopic, {
                    [action.propertyName]: action.newValue
                })
            })
        case TOPIC_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        default:
            return state
    }
}

const topicContentReducer = combineReducers({
    createOrEditTopic
})

export default topicContentReducer