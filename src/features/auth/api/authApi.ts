import { mapAuthResponseToUser } from '@/entities/user'
import type { User } from '@/entities/user/model/types'
import { baseApi } from '@/shared/api'
import { type RequestLoginBody } from './types'

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<User, RequestLoginBody>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            transformResponse: mapAuthResponseToUser,
        }),
    }),
})

export const { useLoginMutation } = userApi
