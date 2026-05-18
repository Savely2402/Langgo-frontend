import { Mutex } from 'async-mutex'
import { baseQuery } from './baseQuery'
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

    const AUTH_ENDPOINTS = ['auth/login', 'auth/register']

    if (
        result.error &&
        result.error.status === 401 &&
        !AUTH_ENDPOINTS.includes(url)
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshToken = localStorage.getItem('refreshToken')

                if (!refreshToken) {
                    return result
                }

                const refreshResult = await baseQuery(
                    {
                        url: 'auth/refresh',
                        method: 'POST',
                        body: { token: refreshToken },
                    },
                    api,
                    extraOptions,
                )

                console.log(refreshResult)

                if (
                    refreshResult.data &&
                    typeof refreshResult.data === 'object' &&
                    'accessToken' in refreshResult.data &&
                    'refreshToken' in refreshResult.data &&
                    typeof refreshResult.data.accessToken === 'string' &&
                    typeof refreshResult.data.refreshToken === 'string'
                ) {
                    localStorage.setItem(
                        'refreshToken',
                        refreshResult.data.refreshToken,
                    )
                    localStorage.setItem(
                        'accessToken',
                        refreshResult.data.accessToken,
                    )
                    result = await baseQuery(args, api, extraOptions)
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
