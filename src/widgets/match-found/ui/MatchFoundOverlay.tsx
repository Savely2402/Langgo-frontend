import { BookOpen } from 'lucide-react'
import {
    selectGameSettings,
    selectGameStartTime,
    selectGameStatus,
} from '@/entities/game/model/selectors'
import { selectPlayersForGame } from '@/entities/player'
import { useUser } from '@/entities/user'
import { useCountdown } from '@/shared/lib/hooks'
import { useAppSelector } from '@/shared/lib/store'
import { Badge } from '@/shared/ui/Badge'
import { MatchStartTimer } from './MatchStartTimer'
import { PlayerCard } from './PlayerCard'

export const MatchFoundOverlay = () => {
    const status = useAppSelector(selectGameStatus)
    const settings = useAppSelector(selectGameSettings)
    const startTime = useAppSelector(selectGameStartTime)

    const { user: currentUser } = useUser()
    const players = useAppSelector((state) =>
        selectPlayersForGame(state, currentUser?.id),
    )
    const { secondsLeft, rawMs } = useCountdown(startTime)

    if (status !== 'starting' || secondsLeft === null) return null

    const [me, rival] = players

    const TOTAL_MS = 5000

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 px-4 backdrop-blur-xs">
            <h1 className="mb-4 text-center text-4xl font-black tracking-tighter text-slate-900 uppercase sm:text-5xl">
                Матч найден!
            </h1>

            {settings && (
                <Badge
                    variant="outline"
                    className="mb-12 flex items-center gap-1.5 rounded-full border-emerald-100 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm"
                >
                    <BookOpen className="size-4" />
                    Словарь &quot;{settings.dictionaryName}&quot; (
                    {settings.langFrom}-{settings.langTo})
                </Badge>
            )}

            <div className="mb-16 flex w-full max-w-md items-center justify-between px-4 sm:px-0">
                <PlayerCard player={me} isMe={true} />

                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#111827] text-xl font-black tracking-widest text-white shadow-lg sm:size-16 sm:text-2xl">
                    VS
                </div>

                <PlayerCard player={rival} isMe={false} />
            </div>

            <MatchStartTimer
                secondsLeft={secondsLeft}
                rawMs={rawMs}
                totalMs={TOTAL_MS}
            />
        </div>
    )
}
