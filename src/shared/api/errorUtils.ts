import { isRtkQueryError, isSerializedError } from './typeGuards'

export function getErrorMessage(error: unknown): string {
    if (isRtkQueryError(error)) {
        if (
            typeof error.status === 'number' &&
            error.data &&
            typeof error.data === 'object' &&
            'message' in error.data &&
            typeof error.data.message === 'string'
        ) {
            return error.data.message
        }

        if ('error' in error) {
            return error.error
        }
    }

    if (
        isSerializedError(error) &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message
    }

    return 'Unknown error'
}
