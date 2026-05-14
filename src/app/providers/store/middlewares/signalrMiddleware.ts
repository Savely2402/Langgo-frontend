import {
    endRound,
    endGame,
    startGame,
    startNewRound,
    initGameConnection,
    closeGameConnection,
    connectionEstablished,
} from '@/entities/game'
import {
    hubConnection,
    joinRoom,
    startConnection,
    stopConnection,
    type EndGameDto,
    type RoundResultDto,
    type StartGameDto,
    type StartRoundDto,
} from '@/shared/api/'
import type { Middleware } from '@reduxjs/toolkit'

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

        hubConnection.on('GameStarted', (data: StartGameDto) => {
            store.dispatch(
                startGame({
                    startTime: data.startTime,
                    settings: data.settings,
                }),
            )
        })

        hubConnection.on('ReceiveRoundResult', (data: RoundResultDto) => {
            store.dispatch(
                endRound({
                    lastRoundWinnerId: data.lastRoundWinnerId,
                    scores: data.scores,
                    nextRoundStartTime: data.newRoundTime,
                    winnerResponseTime: data.winnerResponseTime,
                    correctAnswer: data.correctAnswer,
                }),
            )
        })

        hubConnection.on('ReceiveNewRound', (data: StartRoundDto) => {
            store.dispatch(
                startNewRound({
                    options: data.options,
                    currentQuestion: data.newWord,
                    currentRound: data.roundNumber,
                    roundType: data.roundType,
                    roundEndTime: data.timeForRoundSeconds,
                }),
            )
        })

        hubConnection.on('ReceiveEndGame', (data: EndGameDto) => {
            store.dispatch(
                endGame({
                    scores: data.finalScores,
                    gameWinnerId: data.winnerId,
                }),
            )
        })

        hubConnection.on('ReceiveAnswerResult', (data: EndGameDto) => {
            store.dispatch(
                endGame({
                    scores: data.finalScores,
                    gameWinnerId: data.winnerId,
                }),
            )
        })

        return next(action)
    }
