import { useState } from 'react'
import { Gamepad2, Swords, WifiOff } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'

export type FriendBattleInviteStatus = 'online' | 'offline' | 'inGame'

interface InviteFriendToBattleButtonProps {
    friendId: number
    friendUsername: string
    status: FriendBattleInviteStatus
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
}: InviteFriendToBattleButtonProps) => {
    const [isSending, setIsSending] = useState(false)
    const config = statusConfig[status]
    const Icon = config.icon

    const handleInvite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()

        if (config.disabled || isSending) return

        setIsSending(true)

        await new Promise((resolve) => setTimeout(resolve, 600))

        toast.success(`Приглашение для ${friendUsername} отправлено`, {
            description: `Mock invite id: ${friendId}`,
        })

        setIsSending(false)
    }

    return (
        <Button
            type="button"
            size="sm"
            disabled={config.disabled || isSending}
            className={cn(
                'min-w-[112px] rounded-2xl font-luckiest tracking-wider',
                config.className,
            )}
            onClick={handleInvite}
        >
            {isSending ? (
                <>
                    <Spinner className="size-4" />
                    Отправляем...
                </>
            ) : (
                <>
                    <Icon className="size-4" />
                    {config.label}
                </>
            )}
        </Button>
    )
}
