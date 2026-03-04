import { mapAuthResponseToUser, userApi } from '@/entities/user'
import type { User } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { type RequestLoginBody } from './types'

const loginApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<User, RequestLoginBody>({
            query: (body) => ({
                url: 'api/auth/login',
                method: 'POST',
                body,
            }),
            transformResponse: mapAuthResponseToUser,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data: user } = await queryFulfilled
                dispatch(userApi.util.upsertQueryData('getMe', undefined, user))
            },
        }),
    }),
})

export const { useLoginMutation } = loginApi
