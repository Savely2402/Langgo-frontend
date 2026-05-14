import { mapAuthResponseToUser, userApi } from '@/entities/user'
import type { AuthResponseDto, User } from '@/entities/user'
import { baseApi } from '@/shared/api'
import type { RequestRegisterBody } from './types'

const registerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<User, RequestRegisterBody>({
            query: (body) => ({
                url: 'api/auth/register',
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

export const { useRegisterMutation } = registerApi
