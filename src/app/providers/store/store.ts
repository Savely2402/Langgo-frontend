import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { gameReducer } from '@/entities/game'
import { playerReducer } from '@/entities/player'
import { baseApi } from '@/shared/api'
import { signalrMiddleware } from './middlewares/signalrMiddleware'

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    players: playerReducer,
    game: gameReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, signalrMiddleware),
})
