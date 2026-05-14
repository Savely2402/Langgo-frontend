import { userApi } from '@/entities/user'
import { baseApi } from '@/shared/api'
import type { LogoutBodyRequest } from './types'

const logoutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation<void, LogoutBodyRequest>({
            query: (body) => ({
                url: 'auth/logout',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled

                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')

                    dispatch(
                        userApi.util.upsertQueryData('getMe', undefined, null),
                    )
                } catch {
                    // ignore errors
                }
            },
        }),
    }),
})

export const { useLogoutMutation } = logoutApi
