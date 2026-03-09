import { userApi } from '@/entities/user'
import { baseApi } from '@/shared/api'

const logoutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation<void, void>({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled

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
