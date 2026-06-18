import * as signalR from '@microsoft/signalr'
import {
    closeGameConnection,
    connectionEstablished,
    gameRealtimeApi,
    initGameConnection,
    subscribeGameHubEvents,
} from '@/entities/game'
import { hubConnection, startConnection, stopConnection } from '@/shared/api'
import type { Middleware } from '@reduxjs/toolkit'

let unsubscribeGameHubEvents: (() => void) | null = null
let connectionAttemptId = 0

export const signalrMiddleware: Middleware<object, RootState> =
    (store) => (next) => (action) => {
        if (initGameConnection.match(action)) {
            const currentRoomId = store.getState().game.roomId
            const gameStatus = store.getState().game.status
            const roomId = action.payload

            if (
                currentRoomId === roomId &&
                (gameStatus === 'connecting' || unsubscribeGameHubEvents)
            ) {
                return action
            }

            const result = next(action)
            const attemptId = ++connectionAttemptId

            if (!unsubscribeGameHubEvents) {
                unsubscribeGameHubEvents = subscribeGameHubEvents(store)
            }

            startConnection()
                .then(() => {
                    if (attemptId !== connectionAttemptId) {
                        return
                    }

                    return gameRealtimeApi.joinRoom(roomId)
                })
                .then(() => {
                    if (attemptId !== connectionAttemptId) {
                        return
                    }

                    store.dispatch(connectionEstablished())
                })
                .catch((error) => {
                    if (attemptId === connectionAttemptId) {
                        console.error(error)
                    }
                })

            return result
        }

        if (closeGameConnection.match(action)) {
            const roomId = store.getState().game.roomId
            const shouldLeaveRoom =
                roomId &&
                hubConnection.state === signalR.HubConnectionState.Connected

            connectionAttemptId += 1
            unsubscribeGameHubEvents?.()
            unsubscribeGameHubEvents = null

            const result = next(action)

            if (shouldLeaveRoom) {
                gameRealtimeApi
                    .leaveRoom(roomId)
                    .catch(console.error)
                    .finally(() => {
                        stopConnection().catch(console.error)
                    })
            } else {
                stopConnection().catch(console.error)
            }

            return result
        }

        return next(action)
    }
