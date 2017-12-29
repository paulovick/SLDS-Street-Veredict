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


export const ROOT_SUCCESS = 'ROOT_SUCCESS'
export const ROOT_ERROR = 'ROOT_ERROR'

function rootSuccessAction(message) {
    return {
        type: ROOT_SUCCESS,
        success: message
    }
}

export function rootSuccess(message) {
    return function(dispatch) {
        dispatch(rootSuccessAction(message))
        setTimeout(() => dispatch(rootSuccessAction(null)), 5000)
    }
}

function rootErrorAction(message) {
    return {
        type: ROOT_ERROR,
        error: message
    }
}

export function rootError(message) {
    return function(dispatch) {
        dispatch(rootErrorAction(message))
        setTimeout(() => dispatch(rootErrorAction(null)), 5000)
    }
}