import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
    gameRealtimeApi,
    resetGame,
    selectRoomId,
    clearPlayers,
} from '@/entities/game'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { LeavePrompt } from '@/shared/ui/LeavePrompt'

export const LeaveLobby = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const roomId = useAppSelector(selectRoomId)

    const handleLeave = async () => {
        try {
            if (roomId) {
                await gameRealtimeApi.leaveRoom(roomId)
            }
            dispatch(clearPlayers())
            dispatch(resetGame())
        } catch (error) {
            console.error('Ошибка при выходе из игры: ', error)
        }
    }

    return (
        <>
            <Button variant={'ghost'} onClick={() => navigate('/')}>
                <LogOut />
                Leave
            </Button>

            <LeavePrompt
                open
                title={`Вы действительно хотите покинуть лобби?`}
                onConfirm={handleLeave}
            />
        </>
    )
}
