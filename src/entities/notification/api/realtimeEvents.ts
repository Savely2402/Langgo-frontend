import { toast } from 'sonner'
import { setGameInvite } from '@/entities/game'
import {
    baseApi,
    INCOMING_FRIEND_REQUESTS_TAG,
    notificationsHubConnection,
    USER_FRIENDS_TAG,
} from '@/shared/api'
import type {
    FriendRequestReceivedEventDto,
    FriendRequestResponseEventDto,
    GameInviteReceivedEventDto,
} from './realtimeTypes'

export const subscribeNotificationHubEvents = (dispatch: AppDispatch) => {
    const handleFriendRequestReceived = (
        data: FriendRequestReceivedEventDto,
    ) => {
        dispatch(baseApi.util.invalidateTags([INCOMING_FRIEND_REQUESTS_TAG]))

        toast.info('Новая заявка в друзья', {
            description: `${data.fromUsername} отправил вам заявку`,
        })
    }

    const handleFriendRequestResponse = (
        data: FriendRequestResponseEventDto,
    ) => {
        if (data.accepted) {
            dispatch(baseApi.util.invalidateTags([USER_FRIENDS_TAG]))
        }

        toast.info(
            data.accepted
                ? 'Заявка в друзья принята'
                : 'Заявка в друзья отклонена',
        )
    }

    const handleGameInviteReceived = (data: GameInviteReceivedEventDto) => {
        dispatch(setGameInvite(data))
    }

    const handleGameInviteDeclined = () => {
        toast.info('Пользователь отказался от приглашения')
    }

    notificationsHubConnection.on(
        'FriendRequestReceived',
        handleFriendRequestReceived,
    )
    notificationsHubConnection.on(
        'FriendRequestResponse',
        handleFriendRequestResponse,
    )
    notificationsHubConnection.on(
        'GameInviteReceived',
        handleGameInviteReceived,
    )
    notificationsHubConnection.on(
        'GameInviteDeclined',
        handleGameInviteDeclined,
    )

    return () => {
        notificationsHubConnection.off(
            'FriendRequestReceived',
            handleFriendRequestReceived,
        )
        notificationsHubConnection.off(
            'FriendRequestResponse',
            handleFriendRequestResponse,
        )
        notificationsHubConnection.off(
            'GameInviteReceived',
            handleGameInviteReceived,
        )
        notificationsHubConnection.off(
            'GameInviteDeclined',
            handleGameInviteDeclined,
        )
    }
}
