import {
    endRound,
    endGame,
    startGame,
    startNewRound,
    initGameConnection,
    closeGameConnection,
    connectionEstablished,
} from '@/entities/game'
import { addPlayer, setPlayers, type Player } from '@/entities/player'
import {
    hubConnection,
    joinRoom,
    startConnection,
    stopConnection,
    type EndGameDto,
    type PlayerJoinedDto,
    type RoomStateDto,
    type RoundResultDto,
    // type StartGameDto,
    type StartRoundDto,
} from '@/shared/api/'
import type { Middleware } from '@reduxjs/toolkit'

let initialized = false

export const signalrMiddleware: Middleware<object, RootState> =
    (store) => (next) => (action) => {
        if (initGameConnection.match(action)) {
            const roomId = action.payload

            startConnection()
                .then(() => {
                    joinRoom(roomId)
                })
                .then(() => {
                    console.log(`Успешный вход в комнату ${roomId}`)
                    store.dispatch(connectionEstablished())
                })
                .catch(console.error)
        }

        if (closeGameConnection.match(action)) {
            stopConnection().catch(console.error)
        }

        if (initialized) return next(action)
        initialized = true

        hubConnection.on('ReceiveRoomState', (data: RoomStateDto) => {
            const players: Player[] = data.players.map((p) => {
                return {
                    id: p.userId,
                    username: p.username,
                    isHost: p.isHost,
                    nativeLanguage: p.nativeLanguage,
                    rating: p.rating,
                }
            })

            store.dispatch(setPlayers(players))
        })

        hubConnection.on('PlayerJoined', (data: PlayerJoinedDto) => {
            if (
                store
                    .getState()
                    .players.findIndex((p) => p.id === data.userId) === -1
            ) {
                store.dispatch(
                    addPlayer({
                        id: data.userId,
                        username: data.username,
                        isHost: data.isHost,
                        nativeLanguage: data.nativeLanguage,
                        rating: data.rating,
                    }),
                )
            }
        })

        hubConnection.on('GameStarted', (data: string) => {
            store.dispatch(
                startGame({
                    startTime: data,
                    // settings: data.settings,
                }),
            )
        })

        hubConnection.on('EndRound', (data: RoundResultDto) => {
            store.dispatch(
                endRound({
                    lastRoundWinnerId: data.winnerId,
                    scores: data.scores,
                    nextRoundStartTime: data.newRoundTime,
                    // winnerResponseTime: data.winnerResponseTime,
                    // correctAnswer: data.correctAnswer,
                }),
            )
        })

        hubConnection.on('StartNewRound', (data: StartRoundDto) => {
            console.log('FROM DTO: ', data)

            store.dispatch(
                startNewRound({
                    options: data.options,
                    currentQuestion: data.newWord,
                    currentRound: data.roundNumber,
                    roundType: 'manual',
                    roundEndTime: data.timeForRoundSeconds,
                }),
            )
        })

        hubConnection.on('GameEnded', (data: EndGameDto) => {
            console.log('Data in the end: ')

            store.dispatch(
                endGame({
                    scores: data.scores,
                    gameWinnerId: data.winner,
                }),
            )
        })

        hubConnection.on('ReceiveAnswerResult', (data: EndGameDto) => {
            store.dispatch(
                endGame({
                    scores: data.scores,
                    gameWinnerId: data.winner,
                }),
            )
        })

        return next(action)
    }
