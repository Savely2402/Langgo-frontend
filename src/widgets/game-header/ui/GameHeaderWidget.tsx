import { selectUserScore } from '@/entities/game/model/selectors'
import { selectPlayersForGame } from '@/entities/player'
import { useUser } from '@/entities/user'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'
import { SurrenderGameButton } from '@/features/surrender-game'
import { useAppSelector } from '@/shared/lib/store'
import { Header } from '@/shared/ui/Header'

export const GameHeaderWidget = () => {
    const { user } = useUser()
    const [, opponent] = useAppSelector((state) =>
        selectPlayersForGame(state, user?.id),
    )

    const myScore = useAppSelector((state) =>
        selectUserScore(state, user?.id || 0),
    )
    const opponentScore = useAppSelector((state) =>
        selectUserScore(state, opponent?.id || 0),
    )

    if (!user || !opponent) return null

    const centralSlot = (
        <div className="flex items-center">
            <span className="mr-4 text-base font-bold text-slate-800">
                {user.username || 'Алекс'}
            </span>

            <div className="relative flex items-center gap-6">
                <UserAvatar
                    avatarUrl={user.avatarUrl}
                    username={user.username}
                    className="relative z-10 size-[52px] rounded-full border-[3px] border-white bg-slate-100 shadow-sm"
                />

                <div className="relative z-20 flex flex-col items-center">
                    <div className="absolute bottom-full mb-1 -rotate-6 rounded bg-[#FFC107] px-1.5 py-0.5 text-[10px] font-black tracking-wider text-slate-900 uppercase shadow-sm">
                        vs
                    </div>
                </div>

                <UserAvatar
                    avatarUrl={opponent.avatarUrl}
                    username={opponent.username}
                    className="relative z-10 size-[52px] rounded-full border-[3px] border-white bg-slate-100 shadow-sm"
                />

                <div className="absolute -bottom-1.5 left-1/2 z-30 -translate-x-1/2 rounded-full border-[3px] border-white bg-[#0F172A] px-3 py-0.5 text-sm font-black tracking-widest whitespace-nowrap text-white shadow-md">
                    {myScore} : {opponentScore}
                </div>
            </div>

            <span className="ml-4 text-base font-bold text-slate-800">
                {opponent.username || 'Иван'}
            </span>
        </div>
    )

    return (
        <Header
            leftSlot={<div className="w-10" />}
            centralSlot={centralSlot}
            rightSlot={<SurrenderGameButton />}
        />
    )
}
