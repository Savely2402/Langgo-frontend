import type { AuthLanguageCode } from '@/shared/config'

export interface StartGameResponse {
    gameStartTime: string
}

interface GameSettingsDto {
    dictionaryName: string
    langFrom: string
    langTo: string
    roundsAmount: number
}

export interface PlayerJoinedDto {
    userId: number
    username: string
    isHost: boolean
    avatarUrl: string
    nativeLanguage: AuthLanguageCode
    rating: number
}

export interface RoomStateDto {
    players: {
        userId: number
        username: string
        isHost: boolean
        avatarUrl: string
        nativeLanguage: AuthLanguageCode
        rating: number
    }[]
}

export interface StartGameDto {
    startTime: string
    settings: GameSettingsDto
}

export interface StartRoundDto {
    newWord: string
    roundNumber: number
    roundType: 'test' | 'manual'
    timeForRoundSeconds: string
    options?: string[]
}

export interface RoundResultDto {
    winnerId?: number
    scores: Record<string, number>
    newRoundTime: string
    // correctAnswer: string
    // winnerResponseTime: number
}

export interface EndGameDto {
    scores: Record<string, number>
    winner: number | null
}

export interface CheckAnswerDto {
    roomId: string
    answer: string
}
