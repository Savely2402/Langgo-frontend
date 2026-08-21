import * as signalR from '@microsoft/signalr'

export const notificationsHubConnection = new signalR.HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_BASE_URL + '/notifications', {
        accessTokenFactory: () => localStorage.getItem('accessToken') || '',
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()

let shouldBeConnected = false
let startPromise: Promise<void> | null = null
let stopPromise: Promise<void> | null = null

export const startNotificationsConnection = async () => {
    shouldBeConnected = true

    if (stopPromise) {
        await stopPromise
    }

    if (
        notificationsHubConnection.state ===
        signalR.HubConnectionState.Connected
    ) {
        return
    }

    if (startPromise) {
        await startPromise
        return
    }

    if (
        notificationsHubConnection.state ===
        signalR.HubConnectionState.Disconnected
    ) {
        startPromise = notificationsHubConnection.start().finally(() => {
            startPromise = null
        })

        await startPromise

        if (!shouldBeConnected) {
            await stopNotificationsConnection()
        }
    }
}

export const stopNotificationsConnection = async () => {
    shouldBeConnected = false

    if (startPromise) {
        await startPromise
    }

    if (shouldBeConnected) {
        return
    }

    if (stopPromise) {
        await stopPromise
        return
    }

    if (
        notificationsHubConnection.state !==
        signalR.HubConnectionState.Disconnected
    ) {
        stopPromise = notificationsHubConnection.stop().finally(() => {
            stopPromise = null
        })

        await stopPromise
    }
}
