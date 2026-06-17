import { hubConnection } from '@/shared/api/'
import type { CheckAnswerRequest, StartGameResponse } from './realtimeTypes'

export const gameRealtimeApi = {
    joinRoom: async (roomId: string): Promise<void> => {
        await hubConnection.invoke<boolean>('JoinRoom', roomId)
    },

    leaveRoom: async (roomId: string): Promise<void> => {
        await hubConnection.invoke<boolean>('leaveRoom', roomId)
    },

    startGame: async (roomId: string): Promise<StartGameResponse> => {
        return await hubConnection.invoke<StartGameResponse>(
            'StartGame',
            roomId,
        )
    },

    sendAnswer: async ({
        roomId,
        answer,
    }: CheckAnswerRequest): Promise<void> => {
        console.log('Передаваемые данные в SubmitAnswer: ', answer)

        await hubConnection.invoke<boolean>('SubmitAnswer', roomId, answer)
    },
}
