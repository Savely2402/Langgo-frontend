export interface RequestRespondBattleInviteBody {
    accept: boolean
}

export interface RespondBattleInviteParams {
    roomId: string
    body: RequestRespondBattleInviteBody
}
