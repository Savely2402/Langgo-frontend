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
        clearPlayers: () => {
            return []
        },
    },
})

export const { setPlayers, addPlayer, removePlayer, clearPlayers } =
    playerSlice.actions

export default playerSlice.reducer
