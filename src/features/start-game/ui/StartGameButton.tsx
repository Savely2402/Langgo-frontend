import { useState } from 'react'
import { Play, Loader2 } from 'lucide-react'
import { gameRealtimeApi } from '@/entities/game'
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'

export const StartGameButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useUser()
    const players = useAppSelector((state) => state.players)
    const roomId = useAppSelector((state) => state.game.roomId)

    const me = players.find((p) => p.id === user?.id)
    const isHost = me?.isHost ?? false

    const handleStart = async () => {
        if (!isHost || isLoading || !roomId) return

        try {
            await gameRealtimeApi.startGame(roomId)
        } catch (error) {
            console.error('Ошибка при запуске игры:', error)
            setIsLoading(false)
        }
    }

    if (!isHost) {
        return (
            <Button
                disabled
                variant="secondary"
                className="btn-3d h-16 w-full rounded-3xl text-xl opacity-70"
            >
                Ожидание хоста...
            </Button>
        )
    }

    return (
        <Button
            onClick={handleStart}
            disabled={isLoading}
            className="btn-3d h-16 w-full rounded-3xl font-luckiest text-xl tracking-wider transition-all"
        >
            {isLoading ? (
                <>
                    Запуск... <Loader2 className="ml-2 size-5 animate-spin" />
                </>
            ) : (
                <>
                    Начать игру <Play className="ml-2 size-5 fill-current" />
                </>
            )}
        </Button>
    )
}
