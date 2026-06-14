import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { REDUCER_PATH } from './constants'
import { AUTH_TAG, DICTIONARY_TAG } from './tags'

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: REDUCER_PATH,
    endpoints: () => ({}),
    tagTypes: [AUTH_TAG, DICTIONARY_TAG],
})
