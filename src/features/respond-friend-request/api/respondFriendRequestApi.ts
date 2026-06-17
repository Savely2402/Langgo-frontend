import { baseApi } from '@/shared/api'
import type { RespondFriendRequestParams } from './types'

export const respondFriendRequestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        respondFriendRequest: build.mutation<void, RespondFriendRequestParams>({
            query: ({ requesterId, body }) => ({
                url: `friends/requests/${requesterId}/respond`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useRespondFriendRequestMutation } = respondFriendRequestApi
