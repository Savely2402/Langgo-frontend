import { Mutex } from 'async-mutex'
import { baseQuery } from './baseQuery'
import { REDUCER_PATH } from './constants'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const url = typeof args === 'string' ? args : args.url

    const AUTH_ENDPOINTS = ['api/auth/login', 'api/auth/register']

    if (
        result.error &&
        result.error.status === 401 &&
        !AUTH_ENDPOINTS.includes(url)
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    'api/auth/refresh',
                    api,
                    extraOptions,
                )
                if (refreshResult.data) {
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch({
                        type: `${REDUCER_PATH}/resetApiState`,
                    })
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}
