import { baseApi } from '@/shared/api'

const logoutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                await queryFulfilled
                dispatch(baseApi.util.resetApiState())
            },
        }),
    }),
})

export const { useLogoutMutation } = logoutApi
