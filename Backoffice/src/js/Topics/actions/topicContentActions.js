export const TOPIC_PROPERTY_MODIFIED = 'CREATE_TOPIC_PROPERTY_MODIFIED'
export const TOPIC_JSON_VALIDATION_ERROR = 'TOPIC_JSON_VALIDATION_ERROR'

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