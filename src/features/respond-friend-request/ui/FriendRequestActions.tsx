import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useRespondFriendRequestMutation } from '../api/respondFriendRequestApi'

type FriendRequestAction = 'accept' | 'reject'

interface FriendRequestActionsProps {
    requestId: number
    friendUsername: string
}

export const FriendRequestActions = ({
    requestId,
    friendUsername,
}: FriendRequestActionsProps) => {
    const [pendingAction, setPendingAction] =
        useState<FriendRequestAction | null>(null)
    const [respondFriendRequest] = useRespondFriendRequestMutation()

    const isPending = pendingAction !== null

    const handleRequestAction = async (
        event: React.MouseEvent<HTMLButtonElement>,
        action: FriendRequestAction,
    ) => {
        event.stopPropagation()

        if (isPending) return

        setPendingAction(action)

        try {
            await respondFriendRequest({
                requesterId: requestId,
                body: { accept: action === 'accept' },
            }).unwrap()

            toast.success(
                action === 'accept'
                    ? `Заявка от ${friendUsername} принята`
                    : `Заявка от ${friendUsername} отклонена`,
            )
        } catch {
            toast.error('Не удалось ответить на заявку')
        } finally {
            setPendingAction(null)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                size="icon-sm"
                className="btn-3d rounded-2xl"
                disabled={isPending}
                aria-label={`Принять заявку от ${friendUsername}`}
                onClick={(event) => handleRequestAction(event, 'accept')}
            >
                {pendingAction === 'accept' ? (
                    <Spinner className="size-4" />
                ) : (
                    <Check className="size-4" />
                )}
            </Button>
            <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                className="btn-3d rounded-2xl"
                disabled={isPending}
                aria-label={`Отклонить заявку от ${friendUsername}`}
                onClick={(event) => handleRequestAction(event, 'reject')}
            >
                {pendingAction === 'reject' ? (
                    <Spinner className="size-4" />
                ) : (
                    <X className="size-4" />
                )}
            </Button>
        </div>
    )
}
