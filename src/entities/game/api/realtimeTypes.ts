import type { GameSettingsDto, PlayerDto } from './types'

export interface StartGameResponse {
    gameStartTime: string
}

export type PlayerJoinedEventDto = PlayerDto

export interface RoomStateEventDto {
    players: PlayerDto[]
    settings: GameSettingsDto
}

export interface StartRoundEventDto {
    newWord: string
    roundNumber: number
    roundType?: 'test' | 'manual'
    timeForRoundSeconds: string
    isChoiceRound: boolean
    options?: string[]
}

export interface EndRoundEventDto {
    winnerId?: number
    scores: Record<string, number>
    newRoundTime: string
    correctAnswer: string
    // winnerResponseTime: number
}

export interface EndGameEventDto {
    scores: Record<string, number>
    winner: number | null
}

export interface CheckAnswerRequest {
    roomId: string
    answer: string
}

export interface AnswerResultEventDto {
    isCorrect: boolean
    userId: number
}
