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