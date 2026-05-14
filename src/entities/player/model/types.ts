export type PlayerStatus = 'waiting' | 'ready'

export interface Player {
    id: number
    username: string
    isHost: boolean
    status: PlayerStatus
    avatarUrl?: string
    countryCode: 'ru' | 'en'
    rating: number
}
