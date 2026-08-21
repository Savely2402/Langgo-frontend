import { X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { clearPlayers } from '@/entities/game'
import { useAppDispatch } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { LeavePrompt } from '@/shared/ui/LeavePrompt'

export const CancelLobby = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <>
            <Button variant={'ghost'} onClick={() => navigate(-1)}>
                <X />
                Cancel
            </Button>

            <LeavePrompt
                open
                title={`Вы действительно хотите удалить лобби?`}
                onConfirm={() => dispatch(clearPlayers())}
            />
        </>
    )
}
