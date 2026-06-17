import { useEffect } from 'react'
import { subscribeNotificationHubEvents } from '@/entities/notification'
import { useUser } from '@/entities/user'
import {
    startNotificationsConnection,
    stopNotificationsConnection,
} from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/store'

export const NotificationsRealtimeProvider = () => {
    const dispatch = useAppDispatch()
    const { user } = useUser()
    const userId = user?.id

    useEffect(() => {
        if (!userId) {
            stopNotificationsConnection().catch(console.error)
            return
        }

        const unsubscribeNotificationHubEvents =
            subscribeNotificationHubEvents(dispatch)

        startNotificationsConnection().catch(console.error)

        return () => {
            unsubscribeNotificationHubEvents()
            stopNotificationsConnection().catch(console.error)
        }
    }, [dispatch, userId])

    return null
}
