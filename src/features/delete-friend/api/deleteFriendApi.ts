import { baseApi } from '@/shared/api'

export const deleteFriendApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteFriend: build.mutation<void, number>({
            query: (friendId) => ({
                url: `friends/${friendId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useDeleteFriendMutation } = deleteFriendApi
