import { baseApi } from '@/shared/api'
import type { CreateGameResponse } from './types'

export const dictionaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createGame: build.query<CreateGameResponse, void>({
            query: () => 'api/games/room',
        }),
    }),
})

export const { useLazyCreateGameQuery } = dictionaryApi
