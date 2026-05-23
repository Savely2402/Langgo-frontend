import {
    initGameConnection,
    closeGameConnection,
    connectionEstablished,
    gameRealtimeApi,
    subscribeGameHubEvents,
} from '@/entities/game'
import { startConnection, stopConnection } from '@/shared/api'
import type { Middleware } from '@reduxjs/toolkit'

let unsubscribeGameHubEvents: (() => void) | null = null

export const signalrMiddleware: Middleware<object, RootState> =
    (store) => (next) => (action) => {
        if (initGameConnection.match(action)) {
            if (!unsubscribeGameHubEvents) {
                unsubscribeGameHubEvents = subscribeGameHubEvents(store)
            }

            startConnection()
                .then(() => {
                    gameRealtimeApi.joinRoom(action.payload)
                })
                .then(() => {
                    console.log(`Успешный вход в комнату ${action.payload}`)
                    store.dispatch(connectionEstablished())
                })
                .catch(console.error)
        }

        if (closeGameConnection.match(action)) {
            unsubscribeGameHubEvents?.()
            unsubscribeGameHubEvents = null

            const roomId = store.getState().game.roomId

            if (roomId) {
                gameRealtimeApi
                    .leaveRoom(roomId)
                    .catch(console.error)
                    .finally(() => {
                        stopConnection().catch(console.error)
                    })
            }
        }

        return next(action)
    }
