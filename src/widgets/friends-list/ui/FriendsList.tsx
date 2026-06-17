import { useNavigate } from 'react-router'
import { UserCard, useGetUserFriendsQuery, useUser } from '@/entities/user'
import { DeleteFriendButton } from '@/features/delete-friend'
import {
    InviteFriendToBattleButton,
    type FriendBattleInviteStatus,
} from '@/features/invite-friend-to-battle'
import { routes } from '@/shared/config'
import { Spinner } from '@/shared/ui/Spinner'

const getMockInviteStatus = (friendId: number): FriendBattleInviteStatus => {
    const statuses: FriendBattleInviteStatus[] = ['online', 'inGame', 'offline']

    return statuses[friendId % statuses.length]
}

export const FriendsList = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const {
        data: friends = [],
        isLoading,
        isFetching,
        isError,
    } = useGetUserFriendsQuery(user?.id ?? 0, {
        skip: !user,
    })

    if (!user) {
        return null
    }

    if (isLoading || isFetching) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-sm font-semibold text-slate-400">
                <Spinner className="size-4" />
                Загружаем друзей
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-[28px] border border-dashed border-destructive/30 bg-destructive/5 p-8 text-center text-sm font-semibold text-destructive">
                Не удалось загрузить друзей
            </div>
        )
    }

    if (friends.length === 0) {
        return (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-400">
                У вас пока нет друзей
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {friends.map((friend) => (
                <UserCard
                    key={friend.id}
                    user={friend}
                    onClick={() => navigate(routes.profile(String(friend.id)))}
                    actionsSlot={
                        <div className="flex items-center gap-2">
                            <InviteFriendToBattleButton
                                friendId={friend.id}
                                friendUsername={friend.username}
                                status={getMockInviteStatus(friend.id)}
                            />
                            <DeleteFriendButton
                                friendId={friend.id}
                                friendUsername={friend.username}
                            />
                        </div>
                    }
                />
            ))}
        </div>
    )
}
