import { baseApi, USER_FRIENDS_TAG } from '@/shared/api'

export const deleteFriendApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteFriend: build.mutation<void, number>({
            query: (friendId) => ({
                url: `friends/${friendId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [USER_FRIENDS_TAG],
        }),
    }),
})

export const { useDeleteFriendMutation } = deleteFriendApi
