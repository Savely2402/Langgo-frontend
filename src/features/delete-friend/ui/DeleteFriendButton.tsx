import { useState } from 'react'
import { UserMinus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import { Spinner } from '@/shared/ui/Spinner'
import { useDeleteFriendMutation } from '../api/deleteFriendApi'

interface DeleteFriendButtonProps {
    friendId: number
    friendUsername: string
}

export const DeleteFriendButton = ({
    friendId,
    friendUsername,
}: DeleteFriendButtonProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [deleteFriend, { isLoading }] = useDeleteFriendMutation()

    const handleOpenConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsConfirmOpen(true)
    }

    const handleDeleteFriend = async () => {
        try {
            await deleteFriend(friendId).unwrap()

            toast.success('Друг удалён', {
                description: `${friendUsername} удалён из друзей`,
            })

            setIsConfirmOpen(false)
        } catch {
            toast.error('Не удалось удалить друга')
        }
    }

    return (
        <>
            <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                disabled={isLoading}
                className="btn-3d rounded-2xl"
                aria-label={`Удалить ${friendUsername} из друзей`}
                onClick={handleOpenConfirm}
            >
                {isLoading ? (
                    <Spinner className="size-4" />
                ) : (
                    <UserMinus className="size-4" />
                )}
            </Button>

            <ConfirmDialog
                open={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
                title="Удалить друга?"
                description={`${friendUsername} будет удалён из списка друзей.`}
                confirmText="Удалить"
                cancelText="Отмена"
                isLoading={isLoading}
                onConfirm={handleDeleteFriend}
            />
        </>
    )
}
