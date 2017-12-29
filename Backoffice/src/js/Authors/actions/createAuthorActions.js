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


import $ from 'jquery'

import {
    rootSuccess,
    rootError
} from '../../Root/actions'
import {
    validateJson,
    jsonValidationError
} from './authorContentActions'

export const CREATE_AUTHOR_CREATE_REQUEST = 'CREATE_AUTHOR_CREATE_REQUEST'
export const CREATE_AUTHOR_CREATE_RECEIVE = 'CREATE_AUTHOR_CREATE_RECEIVE'

function requestCreateAuthor(json) {
    return {
        type: CREATE_AUTHOR_CREATE_REQUEST,
        json: json
    }
}

function receiveCreateAuthor(json) {
    return {
        type: CREATE_AUTHOR_CREATE_RECEIVE,
        json: json
    }
}

export function createAuthorAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of author creation are invalid'))
            return
        }
        dispatch(requestCreateAuthor(json))
        $.ajax({
            url: 'http://api.streetveredict.com/authors',
            method: 'POST',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveCreateAuthor(jsonReceived))
            dispatch(rootSuccess('Author created successfully'))
        })
        .fail((error) => {
            dispatch(rootError('Error creating author'))
        })
    }
}