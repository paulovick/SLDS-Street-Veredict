export const POST_PROPERTY_MODIFIED = 'POST_PROPERTY_MODIFIED'
export const POST_JSON_VALIDATION_ERROR = 'POST_JSON_VALIDATION_ERROR'
export const POST_COMPONENT_RESET = 'POST_COMPONENT_RESET'

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
    if (json.type) {
        if (json.type === 'full' && !json.content) {
            result = result || {}
            result.contentError = true
        } else if (json.type === 'link' && !json.link) {
            result = result || {}
            result.linkError = true
        }
    }
    return result
}

export function jsonValidationError(jsonValidation) {
    return {
        type: POST_JSON_VALIDATION_ERROR,
        validation: jsonValidation
    }
}

export function modifyPostProperty(originalPost, propertyName, newValue) {
    return {
        type: POST_PROPERTY_MODIFIED,
        originalPost: originalPost,
        propertyName: propertyName,
        newValue: newValue
    }
}

export function postComponentReset() {
    return {
        type: POST_COMPONENT_RESET
    }
}