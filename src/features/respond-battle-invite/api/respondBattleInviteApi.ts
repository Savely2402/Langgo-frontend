import { baseApi } from '@/shared/api'
import type { RespondBattleInviteParams } from './types'

export const respondBattleInviteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        respondBattleInvite: build.mutation<void, RespondBattleInviteParams>({
            query: ({ roomId, body }) => ({
                url: `games/rooms/${roomId}/invite/respond`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useRespondBattleInviteMutation } = respondBattleInviteApi
