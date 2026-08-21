import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { gameReducer, playersReducer } from '@/entities/game'
import { baseApi } from '@/shared/api'
import { signalrMiddleware } from './middlewares/signalrMiddleware'

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    players: playersReducer,
    game: gameReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, signalrMiddleware),
})
