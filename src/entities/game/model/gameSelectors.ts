export const selectRoomId = (state: RootState) => state.game.roomId
export const selectGameStatus = (state: RootState) => state.game.status
export const selectGameSettings = (state: RootState) => state.game.settings
export const selectGameStartTime = (state: RootState) => state.game.startTime
export const selectGameScores = (state: RootState) => state.game.scores
export const selectGameWinnerId = (state: RootState) => state.game.gameWinnerId

export const selectCurrentQuestion = (state: RootState) =>
    state.game.currentQuestion
export const selectCorrectAnswer = (state: RootState) =>
    state.game.correctAnswer

export const selectLastRoundWinnerId = (state: RootState) =>
    state.game.lastRoundWinnerId
export const selectUserAnswer = (state: RootState) => state.game.userAnswer
export const selectWinnerResponseTime = (state: RootState) =>
    state.game.winnerResponseTime

export const selectUserScore = (
    state: RootState,
    userId: number | undefined,
) => {
    if (!userId) return null
    if (!state.game.scores) return 0
    return userId in state.game.scores ? state.game.scores[userId] : 0
}

export const selectUserAnswerResult = (
    state: RootState,
    userId?: number,
): boolean | undefined | null => {
    if (!userId) return undefined

    return state.game.answerResults[String(userId)] ?? null
}

export const selectCurrentRound = (state: RootState) => state.game.currentRound
export const selectRoundType = (state: RootState) => state.game.roundType
export const selectRoundOptions = (state: RootState) => state.game.options
export const selectRoundStatus = (state: RootState) => state.game.status
export const selectRoundEndTime = (state: RootState) => state.game.roundEndTime
export const selectNextRoundStartTime = (state: RootState) =>
    state.game.nextRoundStartTime
