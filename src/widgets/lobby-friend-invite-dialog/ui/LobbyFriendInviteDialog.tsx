import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react'
import { UserCard, useGetUserFriendsQuery, useUser } from '@/entities/user'
import { InviteFriendToBattleButton } from '@/features/invite-friend-to-battle'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from '@/shared/ui/AlertDialog'
import { Spinner } from '@/shared/ui/Spinner'

interface LobbyFriendInviteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const LobbyFriendInviteDialog = ({
    open,
    onOpenChange,
}: LobbyFriendInviteDialogProps) => {
    const { user } = useUser()
    const [invitedFriendId, setInvitedFriendId] = useState<number | null>(null)
    const {
        data: friends = [],
        isLoading,
        isFetching,
        isError,
    } = useGetUserFriendsQuery(user?.id ?? 0, {
        skip: !user || !open,
    })

    const isFriendsLoading = isLoading || isFetching

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-h-[min(720px,calc(100dvh-2rem))] overflow-hidden rounded-[32px]">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-primary/10 text-primary">
                        <UserRoundPlus className="size-8" />
                    </AlertDialogMedia>
                    <AlertDialogTitle className="font-luckiest text-2xl tracking-wide">
                        Пригласить друга
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Выберите одного друга, которому отправить приглашение в
                        эту комнату.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {isFriendsLoading ? (
                    <div className="flex items-center justify-center gap-2 rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-sm font-semibold text-slate-400">
                        <Spinner className="size-4" />
                        Загружаем друзей
                    </div>
                ) : isError ? (
                    <div className="rounded-[28px] border border-dashed border-destructive/30 bg-destructive/5 p-8 text-center text-sm font-semibold text-destructive">
                        Не удалось загрузить друзей
                    </div>
                ) : friends.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-400">
                        У вас пока нет друзей для приглашения
                    </div>
                ) : (
                    <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto pr-1">
                        {friends.map((friend) => {
                            const isInvited = invitedFriendId === friend.id
                            const isDisabled =
                                invitedFriendId !== null && !isInvited

                            return (
                                <UserCard
                                    key={friend.id}
                                    user={friend}
                                    className="p-4"
                                    actionsSlot={
                                        <InviteFriendToBattleButton
                                            friendId={friend.id}
                                            friendUsername={friend.username}
                                            status="online"
                                            disabled={isDisabled}
                                            isInvited={isInvited}
                                            onInviteSuccess={setInvitedFriendId}
                                        />
                                    }
                                />
                            )
                        })}
                    </div>
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}
