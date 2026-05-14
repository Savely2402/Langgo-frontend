import { baseApi } from '@/shared/api'
import type { CreateGameRequest, CreateGameResponse } from './types'

export const dictionaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createGame: build.mutation<CreateGameResponse, CreateGameRequest>({
            query: (body) => ({
                url: 'games/room',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useCreateGameMutation } = dictionaryApi
