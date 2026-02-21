import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
    credentials: 'include',
})
