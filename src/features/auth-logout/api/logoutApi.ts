import { mapAuthResponseToUser } from '@/entities/user'
import { baseApi } from '@/shared/api'

const loginApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            transformResponse: mapAuthResponseToUser,
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                await queryFulfilled
                dispatch(baseApi.util.resetApiState())
            },
        }),
    }),
})

export const { useLogoutMutation } = loginApi
