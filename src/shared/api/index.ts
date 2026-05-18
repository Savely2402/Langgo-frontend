export { baseApi } from './baseApi'
export { AUTH_TAG } from './tags'
export { getErrorMessage } from './errorUtils'
export { isRtkQueryError, isAbortError } from './typeGuards'
export { REDUCER_PATH } from './constants'
export {
    startConnection,
    stopConnection,
    hubConnection,
} from './signalr/connection'
export {
    sendAnswerToSignalR,
    joinRoom,
    leaveRoom,
    startGame,
} from './signalr/gameApi'
export type {
    StartGameDto,
    StartRoundDto,
    RoundResultDto,
    EndGameDto,
    PlayerJoinedDto,
    RoomStateDto,
} from './signalr/types'
