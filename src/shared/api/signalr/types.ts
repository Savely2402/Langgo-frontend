interface GameSettingsDto {
    dictionaryName: string
    langFrom: string
    langTo: string
    roundsAmount: number
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
    lastRoundWinnerId: string | number | null
    scores: Record<string, number>
    newRoundTime: string
    correctAnswer: string
    winnerResponseTime: number
}

export interface EndGameDto {
    finalScores: Record<string, number>
    winnerId: string | number | null
}

export interface CheckAnswerDto {
    roomId: string
    answer: string
}
