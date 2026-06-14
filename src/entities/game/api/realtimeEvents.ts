import { hubConnection } from '@/shared/api'
import { mapPlayerDtoToPlayer } from '../lib/mapPlayer'
import {
    endGame,
    endRound,
    setAnswerResult,
    setGameSettings,
    startGame,
    startNewRound,
} from '../model/gameSlice'
import { addPlayer, setPlayers } from '../model/playersSlice'
import type {
    AnswerResultEventDto,
    EndGameEventDto,
    EndRoundEventDto,
    PlayerJoinedEventDto,
    RoomStateEventDto,
    StartRoundEventDto,
} from './realtimeTypes'
import type { Player } from '../model/types'
import type { MiddlewareAPI } from '@reduxjs/toolkit'

export const subscribeGameHubEvents = (
    store: MiddlewareAPI<AppDispatch, RootState>,
) => {
    const handleRoomState = (data: RoomStateEventDto) => {
        const players: Player[] = data.players.map(mapPlayerDtoToPlayer)

        store.dispatch(setPlayers(players))
        store.dispatch(
            setGameSettings({
                dictionaryName: data.settings.dictionaryName,
                langFrom: data.settings.langFrom,
                langTo: data.settings.langTo,
                roundsAmount: data.settings.roundsAmount,
            }),
        )
    }

    const handlePlayerJoined = (data: PlayerJoinedEventDto) => {
        if (
            store.getState().players.findIndex((p) => p.id === data.userId) ===
            -1
        ) {
            store.dispatch(
                addPlayer({
                    id: data.userId,
                    username: data.username,
                    isHost: data.isHost,
                    avatarUrl: data.avatarUrl,
                    nativeLanguage: data.nativeLanguage,
                    rating: data.rating,
                }),
            )
        }
    }

    const handleGameStarted = (data: string) => {
        store.dispatch(
            startGame({
                startTime: data,
            }),
        )
    }

    const handleEndRound = (data: EndRoundEventDto) => {
        console.log('End round: ', data)

        store.dispatch(
            endRound({
                lastRoundWinnerId: data.winnerId,
                scores: data.scores,
                nextRoundStartTime: data.newRoundTime,
                correctAnswer: data.correctAnswer,
            }),
        )
    }
    const handleStartNewRound = (data: StartRoundEventDto) => {
        store.dispatch(
            startNewRound({
                options: data.options,
                currentQuestion: data.newWord,
                currentRound: data.roundNumber,
                roundType: 'manual',
                roundEndTime: data.timeForRoundSeconds,
            }),
        )
    }
    const handleEndGame = (data: EndGameEventDto['scores']) => {
        console.log(data)

        store.dispatch(
            endGame({
                scores: data,
                gameWinnerId: 0,
            }),
        )
    }
    const handleAnswerResult = (
        isCorrect: AnswerResultEventDto['isCorrect'],
        userId: AnswerResultEventDto['userId'],
    ) => {
        store.dispatch(
            setAnswerResult({
                isCorrect: isCorrect,
                userId: userId,
            }),
        )
    }

    hubConnection.on('ReceiveRoomState', handleRoomState)

    hubConnection.on('PlayerJoined', handlePlayerJoined)

    hubConnection.on('GameStarted', handleGameStarted)

    hubConnection.on('EndRound', handleEndRound)

    hubConnection.on('StartNewRound', handleStartNewRound)

    hubConnection.on('GameEnded', handleEndGame)

    hubConnection.on('ReceiveAnswerResult', handleAnswerResult)

    return () => {
        hubConnection.off('ReceiveRoomState', handleRoomState)
        hubConnection.off('PlayerJoined', handlePlayerJoined)
        hubConnection.off('GameStarted', handleGameStarted)
        hubConnection.off('EndRound', handleEndRound)
        hubConnection.off('StartNewRound', handleStartNewRound)
        hubConnection.off('GameEnded', handleEndGame)
        hubConnection.off('ReceiveAnswerResult', handleAnswerResult)
    }
}
