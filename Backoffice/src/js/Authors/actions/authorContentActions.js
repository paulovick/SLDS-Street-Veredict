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