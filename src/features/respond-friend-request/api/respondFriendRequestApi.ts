import {
    baseApi,
    INCOMING_FRIEND_REQUESTS_TAG,
    USER_FRIENDS_TAG,
} from '@/shared/api'
import type { RespondFriendRequestParams } from './types'

export const respondFriendRequestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        respondFriendRequest: build.mutation<void, RespondFriendRequestParams>({
            query: ({ requesterId, body }) => ({
                url: `friends/requests/${requesterId}/respond`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, __, { body }) =>
                body.accept
                    ? [INCOMING_FRIEND_REQUESTS_TAG, USER_FRIENDS_TAG]
                    : [INCOMING_FRIEND_REQUESTS_TAG],
        }),
    }),
})

export const { useRespondFriendRequestMutation } = respondFriendRequestApi
