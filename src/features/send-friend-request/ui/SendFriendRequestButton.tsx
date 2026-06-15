import { useState } from 'react'
import { UserCheck, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'

interface SendFriendRequestButtonProps {
    userId: number
    username: string
    isFriend: boolean
}

export const SendFriendRequestButton = ({
    userId,
    username,
    isFriend,
}: SendFriendRequestButtonProps) => {
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const isDisabled = isFriend || isSent || isSending

    const handleSendRequest = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation()

        if (isDisabled) return

        setIsSending(true)

        await new Promise((resolve) => setTimeout(resolve, 500))

        toast.success(`Заявка для ${username} отправлена`, {
            description: `Mock user id: ${userId}`,
        })

        setIsSent(true)
        setIsSending(false)
    }

    return (
        <Button
            type="button"
            size="icon-sm"
            disabled={isDisabled}
            className="btn-3d rounded-2xl disabled:bg-slate-100 disabled:text-slate-400"
            aria-label={
                isFriend || isSent
                    ? `${username} уже в друзьях`
                    : `Добавить ${username} в друзья`
            }
            onClick={handleSendRequest}
        >
            {isSending ? (
                <Spinner className="size-4" />
            ) : isFriend || isSent ? (
                <UserCheck className="size-4" />
            ) : (
                <UserPlus className="size-4" />
            )}
        </Button>
    )
}
