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
