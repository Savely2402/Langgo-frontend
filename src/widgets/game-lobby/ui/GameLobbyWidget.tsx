import { useState } from 'react'
import { BookOpen, Timer, UserRoundPlus } from 'lucide-react'
import { selectGameSettings } from '@/entities/game'
import { useUser } from '@/entities/user'
import { CopyInviteLink } from '@/features/copyInviteLink'
import { CancelLobby } from '@/features/lobby/cancel'
import { LeaveLobby } from '@/features/lobby/leave'
import { StartGameButton } from '@/features/start-game'
import { useAppSelector } from '@/shared/lib/store'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { Header } from '@/shared/ui/Header'
import { LobbyFriendInviteDialog } from '@/widgets/lobby-friend-invite-dialog'
import { GameLobbyPlayers } from './GameLobbyPlayers'

const MAX_LOBBY_PLAYERS = 2

export const GameLobbyWidget = () => {
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
    const { user } = useUser()
    const players = useAppSelector((state) => state.players)

    const me = players.find((p) => p.id === user?.id)
    const isHost = me?.isHost ?? false
    const gameSettings = useAppSelector(selectGameSettings)
    const dictionaryName = gameSettings?.dictionaryName
    const roundsCount = gameSettings?.roundsAmount

    return (
        <>
            <Header leftSlot={isHost ? <CancelLobby /> : <LeaveLobby />} />
            <div className="mx-auto max-w-[640px] px-4">
                <h1 className="my-6 font-luckiest text-3xl tracking-wide sm:text-4xl">
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

                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-black tracking-wide text-slate-500 uppercase sm:text-base">
                        Игроков в лобби ({players.length}/{MAX_LOBBY_PLAYERS})
                    </h2>

                    {isHost && (
                        <Button
                            type="button"
                            variant="outline"
                            className="btn-3d-sm rounded-2xl font-black"
                            onClick={() => setIsInviteDialogOpen(true)}
                        >
                            <UserRoundPlus className="size-4" />
                            Пригласить
                        </Button>
                    )}
                </div>

                <div className="mb-8">
                    <GameLobbyPlayers />
                </div>

                <StartGameButton />
            </div>

            <LobbyFriendInviteDialog
                open={isInviteDialogOpen}
                onOpenChange={setIsInviteDialogOpen}
            />
        </>
    )
}
