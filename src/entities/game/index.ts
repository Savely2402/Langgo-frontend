export {
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
    setGameSettings,
    setAnswerResult,
    clearAnswerResult,
} from './model/gameSlice'

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
    selectRoomId,
} from './model/gameSelectors'

export { useCreateGameMutation } from './api/gameApi'
export { subscribeGameHubEvents } from './api/realtimeEvents'

export type { EndRoundPayload, Player } from './model/types'

export { default as gameReducer } from './model/gameSlice'

export { useAnswerSubmission } from './lib/useAnswerSubmission'

export type { CreateGameRequest } from './api/types'

export type {
    StartGameResponse,
    StartRoundEventDto,
    EndGameEventDto,
    EndRoundEventDto,
    RoomStateEventDto,
    CheckAnswerRequest,
    PlayerJoinedEventDto,
    AnswerResultEventDto,
} from './api/realtimeTypes'

export { gameRealtimeApi } from './api/realtimeApi'

export { setPlayers, addPlayer, clearPlayers } from './model/playersSlice'

export { default as playersReducer } from './model/playersSlice'

export {
    selectCurrentPlayer,
    selectPlayersForGame,
    selectPlayersForLobby,
} from './model/playersSelectors'

export { mapPlayerDtoToPlayer } from './lib/mapPlayer'
