import { mapAuthResponseToUser, userApi } from '@/entities/user'
import type { AuthResponseDto, User } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { type RequestLoginBody } from './types'

const loginApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<User, RequestLoginBody>({
            query: (body) => ({
                url: 'auth/auth',
                method: 'POST',
                body,
            }),
            transformResponse: (response: AuthResponseDto) => {
                localStorage.setItem('accessToken', response.accessToken)
                if (response.refreshToken) {
                    localStorage.setItem('refreshToken', response.refreshToken)
                }

                return mapAuthResponseToUser(response.user)
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: user } = await queryFulfilled

                    dispatch(
                        userApi.util.upsertQueryData('getMe', undefined, user),
                    )
                } catch {
                    // ignore errors
                }
            },
        }),
    }),
})

export const { useLoginMutation } = loginApi
