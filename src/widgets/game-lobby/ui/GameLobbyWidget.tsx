import { useEffect } from 'react'
import { BookOpen, Timer } from 'lucide-react'
import { setPlayers } from '@/entities/player'
import { MOCK_PLAYERS } from '@/entities/player/testing'
import { useUser } from '@/entities/user'
import { CopyInviteLink } from '@/features/copyInviteLink'
import { CancelLobby } from '@/features/lobby/cancel'
import { LeaveLobby } from '@/features/lobby/leave'
import { StartGameButton } from '@/features/start-game'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { Badge } from '@/shared/ui/Badge'
import { Header } from '@/shared/ui/Header'
import { GameLobbyPlayers } from './GameLobbyPlayers'

export const GameLobbyWidget = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setPlayers(MOCK_PLAYERS))
    }, [dispatch])

    const { user } = useUser()
    const players = useAppSelector((state) => state.players)

    const me = players.find((p) => p.id === user?.id)
    const isHost = me?.isHost ?? false

    const dictionaryName = 'Топ 100 Английских слов'
    const roundsCount = 11

    return (
        <>
            <Header leftSlot={isHost ? <CancelLobby /> : <LeaveLobby />} />
            <div className="mx-auto max-w-[640px] px-4">
                <h1 className="my-6 text-4xl font-black tracking-tight">
                    Создание игры - лобби
                </h1>

                <div className="mb-6 flex flex-wrap gap-3">
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <BookOpen className="size-4 text-slate-500" />
                        {dictionaryName}
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <Timer className="size-4 text-slate-500" />
                        Раундов: {roundsCount}
                    </Badge>
                </div>

                <div className="mb-8">
                    <CopyInviteLink />
                </div>

                <div className="mb-8">
                    <GameLobbyPlayers />
                </div>

                <StartGameButton />
            </div>
        </>
    )
}
