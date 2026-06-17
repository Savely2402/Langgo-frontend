import { Check, Gamepad2, Swords, WifiOff } from 'lucide-react'
import { toast } from 'sonner'
import { selectRoomId } from '@/entities/game'
import { cn } from '@/shared/lib/classNames'
import { useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useInviteFriendToBattleMutation } from '../api/inviteFriendToBattleApi'

export type FriendBattleInviteStatus = 'online' | 'offline' | 'inGame'

interface InviteFriendToBattleButtonProps {
    friendId: number
    friendUsername: string
    status: FriendBattleInviteStatus
    disabled?: boolean
    isInvited?: boolean
    onInviteSuccess?: (friendId: number) => void
}

const statusConfig = {
    online: {
        label: 'Позвать',
        icon: Swords,
        disabled: false,
        className: 'btn-3d bg-primary text-white hover:brightness-95',
    },
    offline: {
        label: 'Оффлайн',
        icon: WifiOff,
        disabled: true,
        className: 'bg-slate-100 text-slate-400',
    },
    inGame: {
        label: 'В игре',
        icon: Gamepad2,
        disabled: true,
        className: 'bg-amber-50 text-amber-600',
    },
} satisfies Record<
    FriendBattleInviteStatus,
    {
        label: string
        icon: React.ComponentType<{ className?: string }>
        disabled: boolean
        className: string
    }
>

export const InviteFriendToBattleButton = ({
    friendId,
    friendUsername,
    status,
    disabled = false,
    isInvited = false,
    onInviteSuccess,
}: InviteFriendToBattleButtonProps) => {
    const roomId = useAppSelector(selectRoomId)
    const [inviteFriendToBattle, { isLoading }] =
        useInviteFriendToBattleMutation()
    const config = statusConfig[status]
    const Icon = isInvited ? Check : roomId ? config.icon : Gamepad2
    const isDisabled = config.disabled || isLoading || !roomId || disabled
    const label = isInvited
        ? 'Приглашён'
        : roomId
          ? config.label
          : 'Нет комнаты'

    const handleInvite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()

        if (isDisabled || !roomId || isInvited) return

        try {
            await inviteFriendToBattle({
                roomId,
                body: { userId: friendId },
            }).unwrap()

            toast.success('Приглашение отправлено', {
                description: `Приглашение для ${friendUsername} отправлено`,
            })
            onInviteSuccess?.(friendId)
        } catch {
            toast.error('Не удалось отправить приглашение')
        }
    }

    return (
        <Button
            type="button"
            size="sm"
            disabled={isDisabled || isInvited}
            className={cn(
                'min-w-[112px] rounded-2xl font-luckiest tracking-wider',
                isInvited
                    ? 'bg-emerald-50 text-emerald-600'
                    : roomId
                      ? config.className
                      : 'bg-slate-100 text-slate-400',
            )}
            title={
                !roomId
                    ? 'Приглашение доступно только из комнаты'
                    : isInvited
                      ? `${friendUsername} уже приглашён`
                      : label
            }
            aria-label={
                isInvited
                    ? `${friendUsername} уже приглашён`
                    : roomId
                      ? `Пригласить ${friendUsername} в игру`
                      : 'Приглашение доступно только из комнаты'
            }
            onClick={handleInvite}
        >
            {isLoading ? (
                <>
                    <Spinner className="size-4" />
                    Отправляем...
                </>
            ) : (
                <>
                    <Icon className="size-4" />
                    {label}
                </>
            )}
        </Button>
    )
}
