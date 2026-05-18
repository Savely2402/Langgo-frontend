import type { AuthLanguageCode } from '@/shared/config'

export interface Player {
    id: number
    username: string
    isHost: boolean
    avatarUrl?: string
    nativeLanguage: AuthLanguageCode
    rating: number
}
