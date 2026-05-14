import * as signalR from '@microsoft/signalr'

export const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_API_URL + '/gameHub', {
        accessTokenFactory: () => localStorage.getItem('token') || '',
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()

export const startConnection = async () => {
    if (hubConnection.state === signalR.HubConnectionState.Disconnected) {
        await hubConnection.start()
    }
}

export const stopConnection = async () => {
    if (hubConnection.state !== signalR.HubConnectionState.Disconnected) {
        await hubConnection.stop()
    }
}
