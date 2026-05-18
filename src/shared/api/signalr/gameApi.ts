import { hubConnection } from './connection'
import type { CheckAnswerDto, StartGameResponse } from './types'

export const joinRoom = async (roomId: string): Promise<void> => {
    try {
        await hubConnection.invoke<boolean>('JoinRoom', roomId)
    } catch (error) {
        console.error('Ошибка при подключении к комнате SignalR:', error)
        throw error
    }
}

export const leaveRoom = async (roomId: string): Promise<void> => {
    try {
        await hubConnection.invoke<boolean>('leaveRoom', roomId)
    } catch (error) {
        console.error('Ошибка при выходе из комнаты SignalR:', error)
        throw error
    }
}

export const startGame = async (roomId: string): Promise<StartGameResponse> => {
    try {
        return await hubConnection.invoke<StartGameResponse>(
            'StartGame',
            roomId,
        )
    } catch (error) {
        console.error('Ошибка запуска игры SignalR:', error)
        throw error
    }
}

export const sendAnswerToSignalR = async ({
    roomId,
    answer,
}: CheckAnswerDto): Promise<void> => {
    try {
        await hubConnection.invoke<boolean>('SubmitAnswer', roomId, answer)
    } catch (error) {
        console.error('Ошибка при отправке ответа SignalR:', error)
        throw error
    }
}
