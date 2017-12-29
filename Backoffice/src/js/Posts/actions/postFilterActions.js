export const POST_FILTER_MODIFIED = 'POST_FILTER_MODIFIED'

export function modifyFilter(filter, field, value) {
    return {
        type: POST_FILTER_MODIFIED,
        filter,
        field,
        value
    }
}