export type { Player } from './model/types'

export {
    setPlayers,
    addPlayer,
    removePlayer,
    clearPlayers,
} from './model/slice'

export {
    selectCurrentPlayer,
    selectPlayersForGame,
    selectPlayersForLobby,
} from './model/selectors'

export { default as playerReducer } from './model/slice'
