import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
