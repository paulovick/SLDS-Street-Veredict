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

export const AUTHORS_REQUEST_AUTHORS = 'AUTHORS_REQUEST_AUTHORS'
export const AUTHORS_RECEIVE_AUTHORS = 'AUTHORS_RECEIVE_AUTHORS'

export const REQUEST_AUTHOR_DELETE = 'REQUEST_AUTHOR_DELETE'
export const RECEIVE_AUTHOR_DELETE = 'RECEIVE_AUTHOR_DELETE'

function requestAuthors() {
    return {
        type: AUTHORS_REQUEST_AUTHORS
    }
}

function receiveAuthors(json) {
    return {
        type: AUTHORS_RECEIVE_AUTHORS,
        authors: json.values
    }
}

export function getAuthors() {
    return function(dispatch) {
        dispatch(requestAuthors())
        return $.ajax({
            url: 'http://api.streetveredict.com/authors',
            method: 'GET'
        })
        .done((json) => dispatch(receiveAuthors(json)))
        .fail((error) => {
            dispatch(rootError('Error loading authors'))
        })
    }
}

function requestAuthorDelete(authorId) {
    return {
        type: REQUEST_AUTHOR_DELETE,
        authorId: authorId
    }
}

function receiveAuthorDelete(authorId) {
    return {
        type: RECEIVE_AUTHOR_DELETE,
        authorId: authorId
    }
}

export function deleteAuthor(authorId) {
    return function(dispatch) {
        dispatch(requestAuthorDelete(authorId))
        return $.ajax({
            url: `http://api.streetveredict.com/authors/${authorId}`,
            method: 'DELETE'
        })
        .done(() => {
            dispatch(receiveAuthorDelete(authorId))
            dispatch(rootSuccess('Author deleted successfully'))
        })
        .fail(() => dispatch(rootError('Error deleting author')))
    }
}