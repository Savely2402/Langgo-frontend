export interface RequestRespondFriendRequestBody {
    accept: boolean
}

export interface RespondFriendRequestParams {
    requesterId: number
    body: RequestRespondFriendRequestBody
}
