import { userApi } from '@/entities/user'
import { baseApi } from '@/shared/api'

const logoutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled

                dispatch(userApi.util.upsertQueryData('getMe', undefined, null))
            },
        }),
    }),
})

export const { useLogoutMutation } = logoutApi
