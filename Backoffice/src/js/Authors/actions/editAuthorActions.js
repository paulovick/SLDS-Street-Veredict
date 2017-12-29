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

export const EDIT_AUTHOR_FETCH_REQUEST = 'EDIT_AUTHOR_FETCH_REQUEST'
export const EDIT_AUTHOR_FETCH_RECEIVE = 'EDIT_AUTHOR_FETCH_RECEIVE'

export const EDIT_AUTHOR_EDIT_REQUEST = 'EDIT_AUTHOR_EDIT_REQUEST'
export const EDIT_AUTHOR_EDIT_RECEIVE = 'EDIT_AUTHOR_EDIT_RECEIVE'

function requestAuthor() {
    return {
        type: EDIT_AUTHOR_FETCH_REQUEST
    }
}

function receiveAuthor(json) {
    return {
        type: EDIT_AUTHOR_FETCH_RECEIVE,
        author: json
    }
}

export function fetchAuthor(authorId) {
    return function(dispatch) {
        dispatch(requestAuthor())
        $.ajax({
            url: `http://api.streetveredict.com/authors/${authorId}`,
            method: 'GET'
        })
        .done((json) => dispatch(receiveAuthor(json)))
        .fail((error) => dispatch(rootError('Error loading author')))
    }
}

function requestEditAuthor(json) {
    return {
        type: EDIT_AUTHOR_EDIT_REQUEST,
        json: json
    }
}

function receiveEditAuthor(json) {
    return {
        type: EDIT_AUTHOR_EDIT_RECEIVE,
        json: json
    }
}

export function editAuthorAction(json) {
    return function(dispatch) {
        var jsonValidation = validateJson(json)
        if (jsonValidation !== null) {
            dispatch(jsonValidationError(jsonValidation))
            dispatch(rootError('Some fields of author creation are invalid'))
            return
        }
        dispatch(requestEditAuthor(json))
        $.ajax({
            url: `http://api.streetveredict.com/authors/${json.id}`,
            method: 'PUT',
            data: JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done((jsonReceived) => {
            dispatch(receiveEditAuthor(jsonReceived))
            dispatch(rootSuccess('Author updated successfully'))
        })
        .fail((error) => dispatch(rootError('Error updating author')))
    }
}