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