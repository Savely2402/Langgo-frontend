import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Player } from './types'

const playerSlice = createSlice({
    initialState: [] as Player[],
    name: 'players',
    reducers: {
        setPlayers: (_, action: PayloadAction<Player[]>) => {
            return action.payload
        },
        addPlayer: (state, action: PayloadAction<Player>) => {
            state.push(action.payload)
        },
        removePlayer: (state, action: PayloadAction<Player['id']>) => {
            return state.filter((player) => player.id !== action.payload)
        },
        updatePlayerStatus: (
            state,
            action: PayloadAction<Pick<Player, 'id' | 'status'>>,
        ) => {
            const player = state.find((p) => p.id === action.payload.id)

            if (player) {
                player.status = action.payload.status
            }
        },
        clearPlayers: () => {
            return []
        },
    },
})

export const {
    setPlayers,
    addPlayer,
    removePlayer,
    updatePlayerStatus,
    clearPlayers,
} = playerSlice.actions

export default playerSlice.reducer
