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
    AUTHOR_PROPERTY_MODIFIED,
    AUTHOR_JSON_VALIDATION_ERROR,
    AUTHOR_COMPONENT_RESET
} from '../actions/authorContentActions'

function createOrEditAuthor(
    state = {
        authorJson: null,
        validation: {},
    },
    action
) {
    switch(action.type) {
        case AUTHOR_COMPONENT_RESET:
            return Object.assign({}, state, {
                authorJson: null,
                validation: {}
            })
        case AUTHOR_PROPERTY_MODIFIED:
            return Object.assign({}, state, {
                authorJson: Object.assign({}, action.originalAuthor, {
                    [action.propertyName]: action.newValue
                })
            })
        case AUTHOR_JSON_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validation: action.validation
            })
        default:
            return state
    }
}

const authorContentReducer = combineReducers({
    createOrEditAuthor
})

export default authorContentReducer