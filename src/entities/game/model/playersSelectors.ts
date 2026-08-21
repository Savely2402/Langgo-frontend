import { createSelector } from '@reduxjs/toolkit'

const selectAllPlayers = (state: RootState) => state.players
const selectCurrentUserId = (_state: RootState, userId?: number) => userId

export const selectCurrentPlayer = (state: RootState, userId?: number) => {
    if (!userId) return undefined
    return state.players.find((p) => p.id === userId)
}

export const selectPlayersForLobby = createSelector(
    [selectAllPlayers, selectCurrentUserId],
    (players, currentUserId) => {
        if (!currentUserId) return players

        return [...players].sort((a, b) => {
            if (a.isHost && !b.isHost) return -1
            if (!a.isHost && b.isHost) return 1
            return 0
        })
    },
)

export const selectPlayersForGame = createSelector(
    [selectAllPlayers, selectCurrentUserId],
    (players, currentUserId) => {
        if (!currentUserId) return players

        return [...players].sort((a, b) => {
            if (a.id === currentUserId) return -1
            if (b.id === currentUserId) return 1
            return 0
        })
    },
)
