import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { clearPlayers } from '@/entities/player'
import { useAppDispatch } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { LeavePrompt } from '@/shared/ui/LeavePrompt'

export const LeaveLobby = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <>
            <Button variant={'ghost'} onClick={() => navigate('/')}>
                <LogOut />
                Leave
            </Button>

            <LeavePrompt
                open
                title={`Вы действительно хотите покинуть лобби?`}
                onConfirm={() => dispatch(clearPlayers())}
            />
        </>
    )
}
