import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
    GameState,
    GameStatus,
    EndRoundPayload,
    StartRoundPayload,
    StartGamePayload,
    EndGamePayload,
    AnswerResultsPayload,
    GameSettings,
    GameInvite,
} from './types'

const initialState: GameState = {
    roomId: null,
    status: 'idle',
    settings: null,
    invite: null,
    startTime: null,
    currentRound: 0,
    currentQuestion: null,
    correctAnswer: null,
    userAnswer: null,
    answerResults: {},
    roundType: 'manual',
    roundEndTime: null,
    winnerResponseTime: null,
    options: [],
    nextRoundStartTime: null,
    scores: {},
    lastRoundWinnerId: null,
    gameWinnerId: null,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<StartGamePayload>) => {
            state.status = 'starting'
            state.startTime = action.payload.startTime
            state.currentRound = 1
            state.scores = {}
            state.gameWinnerId = null
        },

        setGameSettings: (state, action: PayloadAction<GameSettings>) => {
            state.settings = action.payload
        },

        setGameInvite: (state, action: PayloadAction<GameInvite>) => {
            state.invite = action.payload
        },

        clearGameInvite: (state) => {
            state.invite = null
        },

        startNewRound: (state, action: PayloadAction<StartRoundPayload>) => {
            state.status = 'playing'
            state.currentQuestion = action.payload.currentQuestion
            state.correctAnswer = null
            state.userAnswer = null
            state.answerResults = {}
            state.winnerResponseTime = null
            state.options = action.payload.options || []
            state.currentRound = action.payload.currentRound
            state.roundType = action.payload.roundType
            state.roundEndTime = action.payload.roundEndTime
            state.nextRoundStartTime = null
            state.lastRoundWinnerId = null
        },

        setRoundStatus: (state, action: PayloadAction<GameStatus>) => {
            state.status = action.payload
        },

        setUserAnswer: (state, action: PayloadAction<string>) => {
            state.userAnswer = action.payload
        },

        setAnswerResult: (
            state,
            action: PayloadAction<AnswerResultsPayload>,
        ) => {
            state.answerResults[action.payload.userId] =
                action.payload.isCorrect
        },

        clearAnswerResult: (state, action: PayloadAction<number>) => {
            state.answerResults[action.payload] = null
        },

        endRound: (state, action: PayloadAction<EndRoundPayload>) => {
            state.status = 'revealing'
            state.lastRoundWinnerId = action.payload.lastRoundWinnerId
            state.scores = action.payload.scores
            state.nextRoundStartTime = action.payload.nextRoundStartTime
            state.correctAnswer = action.payload.correctAnswer
            // state.winnerResponseTime = action.payload.winnerResponseTime
        },

        endGame: (state, action: PayloadAction<EndGamePayload>) => {
            state.status = 'finished'
            state.scores = action.payload.scores
            state.gameWinnerId = action.payload.gameWinnerId
        },

        resetGame: () => initialState,

        initGameConnection: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload
            state.status = 'connecting'
        },
        connectionEstablished: (state) => {
            state.status = 'idle'
        },
        closeGameConnection: (state) => {
            state.status = 'idle'
            state.roomId = null
        },
    },
})

export const {
    startGame,
    startNewRound,
    endRound,
    endGame,
    setRoundStatus,
    resetGame,
    setUserAnswer,
    initGameConnection,
    closeGameConnection,
    connectionEstablished,
    setGameSettings,
    setGameInvite,
    clearGameInvite,
    setAnswerResult,
    clearAnswerResult,
} = gameSlice.actions

export default gameSlice.reducer
