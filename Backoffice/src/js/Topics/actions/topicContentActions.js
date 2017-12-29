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


export const TOPIC_PROPERTY_MODIFIED = 'TOPIC_PROPERTY_MODIFIED'
export const TOPIC_JSON_VALIDATION_ERROR = 'TOPIC_JSON_VALIDATION_ERROR'
export const TOPIC_COMPONENT_RESET = 'TOPIC_COMPONENT_RESET'

export function validateJson(json) {
    var result = null
    if (!json.name) {
        result = result || {}
        result.nameError = true
    }
    return result
}

export function jsonValidationError(jsonValidation) {
    return {
        type: TOPIC_JSON_VALIDATION_ERROR,
        validation: jsonValidation
    }
}

export function modifyTopicProperty(originalTopic, propertyName, newValue) {
    return {
        type: TOPIC_PROPERTY_MODIFIED,
        originalTopic: originalTopic,
        propertyName: propertyName,
        newValue: newValue
    }
}

export function topicComponentReset() {
    return {
        type: TOPIC_COMPONENT_RESET
    }
}