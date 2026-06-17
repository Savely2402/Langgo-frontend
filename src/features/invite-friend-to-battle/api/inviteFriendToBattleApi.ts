import { baseApi } from '@/shared/api'
import type { InviteFriendToBattleParams } from './types'

export const inviteFriendToBattleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        inviteFriendToBattle: build.mutation<void, InviteFriendToBattleParams>({
            query: ({ roomId, body }) => ({
                url: `games/rooms/${roomId}/invite`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useInviteFriendToBattleMutation } = inviteFriendToBattleApi
