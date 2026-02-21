import { baseApi } from '@/shared/api'
import { mapAuthResponseToUser } from '../lib/mapUser'
import type { User } from '../model/types'

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<User, void>({
            query: () => ({
                url: 'auth/me',
                method: 'GET',
            }),
            transformResponse: mapAuthResponseToUser,
        }),
    }),
})

export const { useGetMeQuery } = userApi
