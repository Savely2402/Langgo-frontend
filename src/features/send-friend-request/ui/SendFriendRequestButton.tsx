import { useState } from 'react'
import { UserCheck, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { useSendFriendRequestMutation } from '../api/sendFriendRequestApi'

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
    const [isSent, setIsSent] = useState(false)
    const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation()
    const isDisabled = isFriend || isSent || isLoading

    const handleSendRequest = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation()

        if (isDisabled) return

        try {
            await sendFriendRequest({ friendId: userId }).unwrap()

            toast.success('Заявка отправлена', {
                description: `Заявка для ${username} отправлена`,
            })

            setIsSent(true)
        } catch {
            toast.error('Не удалось отправить заявку')
        }
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
            {isLoading ? (
                <Spinner className="size-4" />
            ) : isFriend || isSent ? (
                <UserCheck className="size-4" />
            ) : (
                <UserPlus className="size-4" />
            )}
        </Button>
    )
}
