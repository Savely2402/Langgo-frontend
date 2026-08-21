import type { GameSettingsDto } from '@/entities/game'

export interface FriendRequestReceivedEventDto {
    friendshipId: number
    fromUserId: number
    fromUsername: string
}

export interface FriendRequestResponseEventDto {
    friendshipId: number
    accepted: boolean
    fromUserId: number
}

export interface GameInviteReceivedEventDto {
    roomId: string
    hostUserId: number
    hostUsername: string
    gameSettings: GameSettingsDto
}

export interface GameInviteDeclinedEventDto {
    roomId: string
    invitedUserId: number
}
