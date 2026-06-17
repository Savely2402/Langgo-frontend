import { baseApi } from '@/shared/api'
import type { RequestSendFriendRequestBody } from './types'

export const sendFriendRequestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendFriendRequest: build.mutation<void, RequestSendFriendRequestBody>({
            query: (body) => ({
                url: 'friends/requests',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useSendFriendRequestMutation } = sendFriendRequestApi
