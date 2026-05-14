export interface CreateGameRequest {
    dictionaryId: number
    mode: 0 | 1
    maxRounds: number
}

export interface CreateGameResponse {
    roomId: string
}
