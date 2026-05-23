import type { LanguageCode } from '@/shared/config'

export interface CreateGameRequest {
    dictionaryId: number
    mode: 0 | 1
    maxRounds: number
}
export interface GameSettingsDto {
    dictionaryName: string
    langFrom: string
    langTo: string
    roundsAmount: number
}

export interface CreateGameResponse {
    roomId: string
    settings: GameSettingsDto
}

export interface PlayerDto {
    userId: number
    username: string
    isHost: boolean
    avatarUrl: string
    nativeLanguage: LanguageCode
    rating: number
}
