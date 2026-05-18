export type GameStatus =
    | 'idle'
    | 'starting'
    | 'playing'
    | 'revealing'
    | 'intermission'
    | 'finished'
    | 'connecting'

export type RoundType = 'manual' | 'test'

export interface AnswerResultsPayload {
    isCorrect: boolean
    userId: number
}

export interface GameSettings {
    dictionaryName: string
    langFrom: string
    langTo: string
    roundsAmount: number
}

export interface GameState {
    roomId: string | null
    status: GameStatus
    settings: GameSettings | null
    startTime: string | null
    currentRound: number
    currentQuestion: string | null
    correctAnswer: string | null
    userAnswer: string | null
    answerResults: Record<string, AnswerResultsPayload['isCorrect']>
    roundType: RoundType
    winnerResponseTime: number | null
    options?: string[]
    roundEndTime: string | null
    nextRoundStartTime: string | null
    scores: Record<string, number>
    lastRoundWinnerId?: number | null
    gameWinnerId: string | number | null
}

export type StartRoundPayload = Pick<
    GameState,
    | 'currentQuestion'
    | 'currentRound'
    | 'roundType'
    | 'roundEndTime'
    | 'options'
>

export type StartGamePayload = Pick<GameState, 'startTime'>

export type EndRoundPayload = Pick<
    GameState,
    | 'lastRoundWinnerId'
    // | 'correctAnswer'
    | 'scores'
    | 'nextRoundStartTime'
    // | 'winnerResponseTime'
>

export type EndGamePayload = Pick<GameState, 'scores' | 'gameWinnerId'>
