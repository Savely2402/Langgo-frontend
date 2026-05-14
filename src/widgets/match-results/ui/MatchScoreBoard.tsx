import { Zap } from 'lucide-react'
import type { Player } from '@/entities/player'
import type { User } from '@/entities/user'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'
import type { MatchResult, ResultConfig } from '../config/matchResultConfig'

interface MatchScoreBoardProps {
    user: User
    opponent: Player
    myScore: number
    opponentScore: number
    result: MatchResult
    ratingChange: number
    config: ResultConfig
}

export const MatchScoreBoard = ({
    user,
    opponent,
    myScore,
    opponentScore,
    result,
    ratingChange,
    config,
}: MatchScoreBoardProps) => {
    const displayedRatingChange = result === 'draw' ? 0 : Math.abs(ratingChange)

    return (
        <div className="mb-8 flex items-start justify-between px-2">
            <div
                className={`flex flex-col items-center transition-all ${result === 'lose' ? 'opacity-60 grayscale-[40]' : ''}`}
            >
                <UserAvatar
                    username={user?.username}
                    avatarUrl={user?.avatarUrl}
                    className={`size-[72px] rounded-full ${result === 'win' ? `ring-4 ring-offset-2 ${config.ringColor}` : 'border-4 border-slate-100 bg-slate-50'}`}
                />
                <span className="mt-3 text-sm font-bold text-slate-800">
                    {user?.username}
                </span>
            </div>

            <div className="flex flex-col items-center pt-2">
                <div className="text-[56px] font-black tracking-tighter text-slate-800">
                    {myScore} <span className="text-slate-700">:</span>{' '}
                    {opponentScore}
                </div>
                <span className="mt-1.5 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                    Final Score
                </span>

                <div
                    className={`mt-4 flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[11px] font-black ${config.ratingBg} ${config.ratingBorder} ${config.ratingText}`}
                >
                    <Zap className="size-3.5 fill-current" />
                    {config.ratingPrefix}
                    {displayedRatingChange} ОЧКОВ РЕЙТИНГА
                </div>
            </div>

            <div
                className={`flex flex-col items-center transition-all ${result === 'win' ? 'opacity-60 grayscale-40' : ''}`}
            >
                <UserAvatar
                    username={opponent?.username}
                    avatarUrl={opponent?.avatarUrl}
                    className={`size-[72px] rounded-full ${result === 'lose' ? `ring-4 ring-offset-2 ${config.ringColor}` : 'border-4 border-slate-100 bg-slate-50'}`}
                />
                <span className="mt-3 text-sm font-semibold text-slate-500">
                    {opponent?.username}
                </span>
            </div>
        </div>
    )
}
