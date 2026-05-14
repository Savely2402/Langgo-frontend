export {
    // answerFailed,
    startNewRound,
    endRound,
    resetGame,
    endGame,
    setRoundStatus,
    startGame,
    setUserAnswer,
    initGameConnection,
    closeGameConnection,
    connectionEstablished,
} from './model/slice'

export {
    selectCurrentRound,
    selectCurrentQuestion,
    selectGameScores,
    selectGameSettings,
    selectGameStartTime,
    selectGameStatus,
    selectGameWinnerId,
    selectLastRoundWinnerId,
    selectNextRoundStartTime,
    selectRoundEndTime,
    selectUserScore,
    selectRoundType,
    selectRoundOptions,
    selectRoundStatus,
    selectUserAnswerResult,
    selectUserAnswer,
    selectCorrectAnswer,
    selectWinnerResponseTime,
} from './model/selectors'

export { useLazyCreateGameQuery } from './api/gameApi'

export type { EndRoundPayload } from './model/types'

export { default as gameReducer } from './model/slice'

export { useAnswerSubmission } from './lib/useAnswerSubmission'
