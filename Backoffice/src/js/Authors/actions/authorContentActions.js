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


export const AUTHOR_PROPERTY_MODIFIED = 'AUTHOR_PROPERTY_MODIFIED'
export const AUTHOR_JSON_VALIDATION_ERROR = 'AUTHOR_JSON_VALIDATION_ERROR'
export const AUTHOR_COMPONENT_RESET = 'AUTHOR_COMPONENT_RESET'

export function validateJson(json) {
    var result = null
    if (!json.name) {
        result = result || {}
        result.nameError = true
    }
    if (!json.type) {
        result = result || {}
        result.typeError = true
    }
    return result
}

export function jsonValidationError(jsonValidation) {
    return {
        type: AUTHOR_JSON_VALIDATION_ERROR,
        validation: jsonValidation
    }
}

export function modifyAuthorProperty(originalAuthor, propertyName, newValue) {
    return {
        type: AUTHOR_PROPERTY_MODIFIED,
        originalAuthor: originalAuthor,
        propertyName: propertyName,
        newValue: newValue
    }
}

export function authorComponentReset() {
    return {
        type: AUTHOR_COMPONENT_RESET
    }
}