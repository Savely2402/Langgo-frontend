import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Player } from './types'

const PlayerSlice = createSlice({
    initialState: [] as Player[],
    name: 'Players',
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

export const { setPlayers, addPlayer, clearPlayers } = PlayerSlice.actions

export default PlayerSlice.reducer
